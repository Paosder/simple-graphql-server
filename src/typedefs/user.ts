import { gql } from "apollo-server";

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
  }

  type Query {
    getUser(name: String): [User]
  }
`;

export default typeDefs;