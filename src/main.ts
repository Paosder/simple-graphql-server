import { ApolloServer, AuthenticationError, gql } from 'apollo-server';
import { environment } from './env';
import typeDefs from './typedefs';
import resolvers from './resolvers';

interface ConnectionParams {
  userid: string;
  roomid: string;
}

const server = new ApolloServer({
  typeDefs,
  introspection: environment.apollo.introspection,
  playground: environment.apollo.playground,
  resolvers,
  context: ({req, connection}) => {
    // req : HTTP Request, connection: WS Request.
    // ! DO NOT USE USER LIKE BELOW IN PRODUCTION. THIS IS JUST SAMPLE.
    const user = req ? req.headers.userid : connection?.context.userid;
    const roomId = req ? req.headers.roomid : connection?.context.roomid;
    if (!user) {
      throw new AuthenticationError('no user id reserved.');
    }

    if (!roomId) {
      throw new AuthenticationError('no room id reserved.');
    }
    return {
      user,
      roomId,
    };
  },
  subscriptions: {
    onConnect: (connectionParams: any) => {
      const params = connectionParams as ConnectionParams;
      if (params.userid && params.roomid) {
        const user = params.userid;
        console.log(`[room-${params.roomid}] connected: ${user}`);
      }
      return connectionParams;
    },
    onDisconnect: async (_, context) => {
      const params = await context.initPromise as ConnectionParams;
      console.log(`[room-${params.roomid}] disconnected: ${params.userid}`);
    }
  }
});

server.listen(environment.port, environment.binding).then(
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