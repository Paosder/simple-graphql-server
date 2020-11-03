import { mergeTypeDefs } from '@graphql-tools/merge';
import { gql } from 'apollo-server';
import userDefs from './user';

const commonDefs = gql`
  scalar JSON
`;

const typeDefs = mergeTypeDefs([commonDefs, userDefs]);

export default typeDefs;
