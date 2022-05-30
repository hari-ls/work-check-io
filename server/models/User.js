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
  {
    timestamps: true,
    versionKey: false,
  }
);
// defining virtuals
userSchema.set("toObject", { virtuals: true });
userSchema.set("toJSON", { virtuals: true });
// for full name (get & set)
userSchema
  .virtual("fullName")
  .get(function () {
    return this.firstName + " " + this.lastName;
  })
  .set(function (newName) {
    var nameParts = newName.split(" ");
    this.firstName = nameParts[0];
    this.lastName = nameParts[1];
  });
// for initials (get)
userSchema.virtual("initials").get(function () {
  return this.firstName[0] + this.lastName[0];
});
// setup middleware for encrypting password
userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const rounds = 10; // salt rounds
    this.password = await bcrypt.hash(this.password, rounds);
  }
  next();
});
userSchema.pre("findOneAndUpdate", async function (next) {
  let update = { ...this.getUpdate() };
  if (update.password) {
    const rounds = 10; // salt rounds
    update.password = await bcrypt.hash(update.password, rounds);
    this.setUpdate(update);
  }
  next();
});
// comparing input password with hashed password
userSchema.methods.isCorrectPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};
// create model
const User = mongoose.model("User", userSchema, "users");
// export model
module.exports = User;
