// import dependencies
const { User, Workspace, Schedule, Entry, Journal } = require("../models");
const { signToken } = require("../utils/auth");
const { AuthenticationError } = require("apollo-server-express");
// create resolvers
const resolvers = {
  Query: {
    user: async (parent, { _id }, context) => {
      // check if logged in
      if (context.user) {
        const user = await User.findById(context.user._id);
        return user;
      }
      // if not logged in
      throw new AuthenticationError("Not logged in");
    },
  },
  Mutation: {
    login: async (parent, { username, password }) => {
      const user = await User.findOne({ username });
      // if not found
      if (!user) {
        throw new AuthenticationError("Incorrect username");
      }
      // check for password
      const checkPassword = await user.isCorrectPassword(password);
      if (!checkPassword) {
        throw new AuthenticationError("Incorrect password");
      }
      // generate token
      const token = await signToken(user);
      return { token, user };
    },
  },
};
// export resolvers
module.exports = resolvers;
