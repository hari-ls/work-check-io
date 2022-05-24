// import dependencies
const { gql } = require("apollo-server-express");
const dateScalar = require("../utils/dateScalar");
// define types
const typeDefs = gql`
  type User {
    _id: ID
    username: String
    firstName: String
    lastName: String
    email: String
  }
  type Auth {
    token: ID
    user: User
  }
  type Entry {
    _id: ID
    workspace: Workspace
    user: User
    checkIn: String
    plan: String
    summary: String
    productivity: Int
    mood: String
    checkOut: String
  }
  type Journal {
    _id: ID
    workspace: Workspace
    user: User
    from: String
    to: String
    entries: [Entry]
  }
  # define queries
  type Query {
    user(_id: ID!): User
    workspace(_id: ID!): Workspace
    workspaces(owner: ID!): [Workspace]
    schedule(_id: ID!): Schedule
    schedules: [Schedule]
    entry(_id: ID!): Entry
    entries: [Entry]
    journal(_id: ID!): Journal
    journals: [Journal]
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
  }
`;
// export type definitions
module.exports = typeDefs;
