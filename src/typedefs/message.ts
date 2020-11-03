import { gql } from "apollo-server";

const typeDefs = gql`
  type Message {
    id: ID!
    type: String!
    user: User
    payload: JSON!
  }
`;

export default typeDefs;
