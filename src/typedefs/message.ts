import { gql } from "apollo-server";

const typeDefs = gql`
  type Message {
    type: String!
    user: User
    payload: JSON!
    timestamp: DateTime!
  }

  type Mutation {
    addMessage(type: String! payload: JSON!): Message
  }

  type Subscription {
    newMessage: Message
  }
`;

export default typeDefs;
