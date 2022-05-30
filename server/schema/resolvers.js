// import dependencies
const { User, Entry } = require("../models");
const { signToken } = require("../utils/auth");
const dateScalar = require("../utils/dateScalar");
const {
  AuthenticationError,
  SyntaxError,
  ForbiddenError,
  UserInputError,
  ApolloError,
  ValidationError,
} = require("apollo-server-express");
// create resolvers
const resolvers = {
  Date: dateScalar,
  Query: {
    user: async (parent, args, context) => {
      // check if logged in
      if (context.user) {
        const user = await User.findById(context.user._id);
        return user;
      }
      // if not logged in
      throw new AuthenticationError("Not logged in");
    },
    // existing open entry
    existing: async (parent, args, context) => {
      if (context.user) {
        const entry = await Entry.findOne({
          user: context.user._id,
          checkOut: null,
        });
        return entry;
      }
      // if not authenticated or authorised
      throw new AuthenticationError("Permission denied!");
    },
    // entry details
    entry: async (parent, { _id }, context) => {
      if (context.user) {
        const entry = await Entry.findById(_id);
        return entry;
      }
      // if not authenticated or authorised
      throw new AuthenticationError("Permission denied!");
    },
    // complied journal
    journal: async (parent, { start, end }, context) => {
      if (context.user) {
        const from = start;
        const to = end;

        const entries = await Entry.find({
          user: context.user._id,
          checkIn: { $gte: start },
          checkOut: { $lte: end },
        }).sort("-checkIn");

        // const durations = entries.map((entry) => entry.duration);
        // const totalDuration = entries.reduce((prev, curr) => prev + curr, 0);
        // const avgProductivity = "";
        // const overallMood = "";

        return { from, to, entries };
      }
      throw new ForbiddenError("Permission denied!");
    },
  },
  Mutation: {
    login: async (parent, { username, password }) => {
      const user = await User.findOne({ username });
      // if not found
      if (!user) {
        throw new UserInputError("Incorrect username");
      }
      // check for password
      const checkPassword = await user.isCorrectPassword(password);
      if (!checkPassword) {
        throw new ValidationError("Incorrect password");
      }
      // generate token
      const token = await signToken(user);
      return { token, user };
    },
    register: async (
      parent,
      { firstName, lastName, email, username, password, confirmPassword }
    ) => {
      const passCheck = password === confirmPassword;
      const usernameCheck = await User.findOne({ username });

      if (passCheck && !usernameCheck) {
        const user = await User.create({
          username,
          firstName,
          lastName,
          email,
          password,
        });

        const token = await signToken(user);

        const existing = await Entry.findOne({
          user: user._id,
          checkOut: null,
        });
        return { token, user, existing };
      }
      throw new ApolloError("Something went wrong!");
    },
    checkIn: async (parent, { start }, context) => {
      if (context.user) {
        try {
          const existing = await Entry.findOne({
            user: context.user._id,
            checkOut: null,
          });
          if (!existing) {
            const created = await Entry.create({
              user: context.user._id,
              checkIn: start,
            });
            return created;
          }
          return existing;
        } catch (err) {
          console.log(err);
          throw new ApolloError("Something went wrong!");
        }
      }
      throw new AuthenticationError("Permission denied!");
    },
    updateEntry: async (parent, { _id, plan, summary }, context) => {
      if (context.user) {
        const entry = await Entry.findByIdAndUpdate(
          { _id },
          { plan, summary },
          { new: true }
        );
        return entry;
      }
      throw new ForbiddenError("Permission denied!");
    },
    checkOut: async (
      parent,
      { _id, plan, summary, productivity, mood, end },
      context
    ) => {
      if (context.user) {
        const entry = await Entry.findByIdAndUpdate(
          _id,
          {
            plan,
            summary,
            productivity,
            mood,
            checkOut: end,
          },
          { new: true }
        );
        return entry;
      }
      throw new ForbiddenError("Permission denied!");
    },
    removeEntry: async (parent, { _id }, context) => {
      if (context.user) {
        const entry = await Entry.deleteOne({ _id });
        return entry;
      }
      throw new ForbiddenError("Permission denied!");
    },
    updateUserInfo: async (
      parent,
      { firstName, lastName, email, username },
      context
    ) => {
      if (context.user) {
        const user = await User.findByIdAndUpdate(
          context.user._id,
          { firstName, lastName, email, username },
          { new: true }
        );
        return user;
      }
      throw new ForbiddenError("Permission denied!");
    },
    changePassword: async (
      parent,
      { newPassword, confirmNewPassword },
      context
    ) => {
      const passCheck = newPassword === confirmNewPassword;
      if (context.user && passCheck) {
        const user = await User.findOneAndUpdate(
          { _id: context.user._id },
          { password: newPassword },
          { new: true }
        );
        return user;
      }
      throw new ForbiddenError("Permission denied!");
    },
  },
};
// export resolvers
module.exports = resolvers;
