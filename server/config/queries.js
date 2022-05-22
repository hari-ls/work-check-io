const db = require("./connection");
const { User, Workspace, Schedule, Entry, Journal } = require("../models");

db.once("open", async () => {
  // const workspace = await Workspace.findOne({
  //   slug: "ls-tech",
  // })
  //   .populate({
  //     path: "members.userId",
  //     model: "User",
  //     select: "username firstName lastName fullName email",
  //   })
  //   .populate({
  //     path: "owner",
  //     model: "User",
  //     select: "username initials fullName email",
  //   });

  const user = await User.findOne({ username: "Shah" });
  console.log(user ? "found" : "not found");
});

// const token = "afasdfasdfsafasdf";

// const check = () => {
//   return Date.now() >= new Date(2021, 5, 5);
// };

// console.log(check());
