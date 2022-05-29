// import dependencies
const { gql } = require("apollo-server-express");
const dateScalar = require("../utils/dateScalar");
// define types
const typeDefs = gql`
  scalar Date

  type User {
    _id: ID
    username: String
    firstName: String
    lastName: String
    email: String
  }
  type Entry {
    _id: ID
    user: User
    checkIn: String
    plan: String
    summary: String
    productivity: Int
    mood: Moods
    checkOut: String
    duration: Float
  }
  type Journal {
    from: String
    to: String
    entries: [Entry]
  }
  type Auth {
    token: ID
    user: User
  }
  enum Moods {
    HAPPY
    FROWN
    SAD
  }
  # define queries
  type Query {
    user: User
    existing: Entry
    entry(_id: ID!): Entry
    journal(start: String!, end: String!): Journal
  }
  # define mutations
  type Mutation {
    login(username: String!, password: String!): Auth
    register(
      firstName: String
      lastName: String!
      email: String!
      username: String!
      password: String!
      confirmPassword: String!
    ): Auth
    checkIn(start: String!): Entry
    updateEntry(_id: ID!, plan: String, summary: String): Entry
    checkOut(
      _id: ID!
      plan: String
      summary: String
      productivity: Float!
      mood: Moods!
      end: String!
    ): Entry
    removeEntry(_id: ID!): Entry
    updateUserInfo(
      username: String
      firstName: String
      lastName: String
      email: String
    ): User
    changePassword(newPassword: String!, confirmNewPassword: String!): User
  }
`;
// export type definitions
module.exports = typeDefs;
