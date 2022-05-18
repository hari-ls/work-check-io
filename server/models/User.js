// import mongoose
const mongoose = require("mongoose");
// schema constructor
const { Schema } = mongoose;
// import bcrypt for password hashing
const bcrypt = require("bcrypt");
// building schema
const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      unique: true,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
    },
  },
  { timestamps: true, versionKey: false }
);
// setup middleware for encrypting password
userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const rounds = 10; // salt rounds
    this.password = await bcrypt.hash(this.password, rounds);
  }
  next();
});
// comparing input password with hashed password
userSchema.methods.isCorrectPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};
// define collection name
const collectionName = "users";
// create model
const User = mongoose.model("User", userSchema, collectionName);
// export model
module.exports = User;
