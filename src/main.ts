import { ApolloServer, gql } from 'apollo-server';
import { environment } from './env';
import { Resolvers, User } from './generated/graphql';

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
  }

  type Query {
    getUser(name: String!): [User]
  }
`;

const users: Array<User> = [
  {
    id: '1',
    name: 'Jaden'
  }, {
    id: '2',
    name: 'Lucas'
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