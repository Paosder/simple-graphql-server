import { ApolloServer, AuthenticationError, gql } from 'apollo-server';
import { environment } from './env';
import { Resolvers, User } from './generated/graphql';
import typeDefs from './typedefs';


const users: Array<User> = [
  {
    id: '1',
    name: 'Jaden'
  }, {
    id: '2',
    name: 'Lucas'
  }, {
    id: '3',
    name: 'Carson'
  }, {
    id: '4',
    name: 'TEST'
  }
];

const resolvers: Resolvers = {
  Query: {
    getUser: (_, { name }) => {
      const result = users.reduce<Array<User>>((acc, el) => {
        if (el.name === name) {
          acc.push(el);
        }
        return acc;
      }, []);
      return result;
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  introspection: environment.apollo.introspection,
  playground: environment.apollo.playground,
  resolvers,
  context: ({req, connection}) => {
    // req : HTTP Request, connection: WS Request.
    const user = req ? req.headers.authorization : connection?.context.authorization;
    if (!user) {
      throw new AuthenticationError('no user id reserved.');
    }
    return {
      user,
    };
  }
});

server.listen(environment.port).then(
  ({ url, subscriptionsUrl}) => {
  console.log(`server Listening at ${url}`);
  console.log(`Subscription Listening at ${subscriptionsUrl}`);
});

// @ts-ignore
if (module.hot) {
  // @ts-ignore 
  module.hot.accept();
  // @ts-ignore
  module.hot.dispose(() => {
    console.log('Module disposed. ');
    server.stop();
  });
}