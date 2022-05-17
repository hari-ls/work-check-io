// import connection
const db = require("./connection");
// import models
const { User, Workspace, Schedule, Entry, Journal } = require("../models");
// perform action on event: once open
db.once("open", async () => {
  // acknowledge start
  console.log("Seeding started");
  // initialise users
  await User.deleteMany(); // remove existing
  const users = User.insertMany([
    {
      username: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    {
      username: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    {
      username: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    {
      username: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    {
      username: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  ]);
  console.log("Users seeded!");
  // initialise workspaces
  await Workspace.deleteMany(); // remove existing
  const workspaces = Workspace.insertMany([]);
  console.log("Workspaces seeded");
  // initlialise schedules
  await Schedule.deleteMany(); // remove existing
  const schedules = Schedule.insertMany([]);
  console.log("Schedule seeded");
  // initiliase entries
  await Entry.deleteMany(); // remove existing
  const entries = Entry.insertMany([]);
  console.log("Entries seeded");
  // initialise journals
  await Journal.deleteMany();
  const journals = Journal.insertMany([]);
  console.log("Journals seeded");
  // acknowledge end
  console.log("Seeding completed!");
  // exit from console
  process.exit();
});
