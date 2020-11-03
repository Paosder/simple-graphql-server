import { mergeTypeDefs } from '@graphql-tools/merge';
import userDefs from './user';

const typeDefs = mergeTypeDefs([userDefs]);

export default typeDefs;
