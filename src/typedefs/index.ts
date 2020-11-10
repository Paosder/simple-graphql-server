import { mergeTypeDefs } from '@graphql-tools/merge';
import { gql } from 'apollo-server';
import userDefs from './user';
import messageDefs from './message';

const commonDefs = gql`
  scalar JSON
  scalar DateTime
`;

const typeDefs = mergeTypeDefs([commonDefs, userDefs, messageDefs]);

export default typeDefs;
