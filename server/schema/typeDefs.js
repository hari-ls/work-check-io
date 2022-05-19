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
    workspaces: [Workspace]
  }
  type Auth {
    token: ID
    user: User
  }
  type Workspace {
    _id: ID
    name: String
    slug: String
    limit: Int
    owner: User
    users: [Member]
  }
  type Member {
    _id: ID
    user: User
    jobTitle: String
  }
  type Schedule {
    _id: ID
    workspace: Workspace
    name: String
    description: String
    weeklyHours: Float
    users: [User] # can be member
  }
  type Entry {
    _id: ID
    workspace: Workspace
    user: User
    checkIn: Date
    plan: String
    summary: String
    productivity: Int
    mood: String
    checkOut: Date
  }
  type Journal {
    _id: ID
    workspace: Workspace
    user: User
    from: Date
    to: Date
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
  }
`;
// export type definitions
module.exports = typeDefs;
