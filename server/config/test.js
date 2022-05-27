const db = require("./connection");
const { User, Workspace, Schedule, Entry, Journal } = require("../models");
const moment = require("moment");
const { duration } = require("moment");

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

  const user = await User.findOne({ lastName: "Shah" });
  console.log(user ? "found" : "not found");

  const start = [2022, 3, 15];
  const end = [2022, 3, 28];

  const from = new Date(...start);
  const to = new Date(...end);
  console.log(typeof from, typeof to);

  const entries = await Entry.find({
    user: user._id,
    checkIn: { $gte: from },
    checkOut: { $lte: to },
  });
  // console.log(entries);

  const outTime = moment(entries[0].checkOut);
  const inTime = moment(entries[0].checkIn);
  const difference = outTime.diff(inTime, "hours", true).toFixed(2);
  // console.log(parseFloat(difference));
  const now = new Date();
  console.log(now, "jkjkjkj");

  const allDurations = () => entries.map((entry) => parseFloat(entry.duration));
  const sumDurations = allDurations().reduce(
    (prev, curr) => parseFloat(prev) + parseFloat(curr),
    0
  );
  // console.log(allDurations, sumDurations);
  const _id = "628f3c1aaf07ce742eb98dde";
  const singleEntry = await Entry.findById(_id);
  // console.log(singleEntry);

  const existing = await Entry.findOne({
    user: user._id,
    checkOut: null,
  });
  console.log(existing);

  process.exit();
});

// const token = "afasdfasdfsafasdf";

// const check = () => {
//   return Date.now() >= new Date(2021, 5, 5);
// };

// console.log(check());
