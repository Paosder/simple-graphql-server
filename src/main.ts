import { ApolloServer, AuthenticationError, gql } from 'apollo-server';
import { environment } from './env';
import typeDefs from './typedefs';
import resolvers from './resolvers';
import { redisClient } from './db';





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