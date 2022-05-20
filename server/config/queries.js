const db = require("./connection");
const { User, Workspace, Schedule, Entry, Journal } = require("../models");

db.once("open", async () => {
  const workspace = await Workspace.findOne({
    slug: "ls-tech",
  })
    .populate({
      path: "members.userId",
      model: "User",
      select: "username firstName lastName fullName email",
    })
    .populate({
      path: "owner",
      model: "User",
      select: "username initials fullName email",
    });

  const user = await User.find({ lastName: "Shah" });
  console.log(workspace.members, user);
});
