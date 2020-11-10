import GraphQLJSON from 'graphql-type-json';
import { Message, Resolvers, User } from "@generated/graphql";
import { NEW_MESSAGE, pubsub, redisClient } from '@db';
import { GraphQLDateTime } from 'graphql-iso-date';
import { Context } from 'src/types';

const getUser = async (id: string) => {
  const name = await redisClient.hget(`user:${id}`, 'name');

  if (!name) return null;

  return {
    id,
    name,
  };
}

const resolvers: Resolvers<Context> = {
  JSON: GraphQLJSON,
  DateTime: GraphQLDateTime,
  Query: {
    getUser: async (_, { id }) => {
      return await getUser(id);
    }
  },
  Subscription: {
    newMessage: {
      subscribe: () => pubsub.asyncIterator([NEW_MESSAGE]),
    }
  },
  Mutation: {
    addMessage: (root, { type, payload }, {roomId, user}) => {
      const newMessage: any = {
        type,
        user,
        payload,
        timestamp: new Date(),
      };
      redisClient.lpush(roomId, JSON.stringify(newMessage));
      pubsub.publish(NEW_MESSAGE, {
        newMessage: newMessage,
      });
      return newMessage as Message;
    }
  },
  Message: {
    user: async (root, args, context) => {
      const user = root.user as any; 
      if (typeof user === 'string') {
        return await getUser(user);
      }
      return user;
    }
  }
}

export default resolvers;