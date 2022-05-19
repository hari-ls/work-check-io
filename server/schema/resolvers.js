// import dependencies
const { User, Workspace, Schedule, Entry, Journal } = require("../models");
const { signToken } = require("../utils/auth");
const { AuthenticationError } = require("apollo-server-express");
// create resolvers
const resolvers = {
  Query: {},
  Mutation: {},
};
// export resolvers
module.exports = resolvers;
