import GraphQLJSON from 'graphql-type-json';
import { Resolvers,User } from "@generated/graphql";
import { users } from '@db';

const resolvers: Resolvers = {
  JSON: GraphQLJSON,
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

export default resolvers;