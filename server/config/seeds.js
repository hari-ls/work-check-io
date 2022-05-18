// import connection
const db = require("./connection");
// import models
const { User, Workspace, Schedule, Entry, Journal } = require("../models");
// perform action on event: once open
db.once("open", async () => {
  // acknowledge start
  console.log("Started...");
  // initialise users
  await User.deleteMany(); // remove existing
  let usersSeedData = [
    {
      username: "r.cooper",
      firstName: "Ricardo",
      lastName: "Cooper",
      email: "ricardo.cooper@example.com",
      password: "PasswordR",
    },
    {
      username: "kristen.ramos",
      firstName: "Kristen",
      lastName: "Ramos",
      email: "k.ramos01@example.com",
      password: "PasswordK",
    },
    {
      username: "tedfox005",
      firstName: "Ted",
      lastName: "Fox",
      email: "tedfox05@example.com",
      password: "PasswordT",
    },
    {
      username: "lesxander",
      firstName: "Leslie",
      lastName: "Alexander",
      email: "lesxander@example.com",
      password: "PasswordL",
    },
    {
      username: "mich.foster",
      firstName: "Michael",
      lastName: "Foster",
      email: "mich.foster567@example.com",
      password: "PasswordM",
    },
    {
      username: "dries.v",
      firstName: "Dries",
      lastName: "Vincent",
      email: "dries7@example.com",
      password: "PasswordD",
    },
    {
      username: "courtney",
      firstName: "Courtney",
      lastName: "Henry",
      email: "courtney@example.com",
      password: "PasswordC",
    },
    {
      username: "tomCook",
      firstName: "Tom",
      lastName: "Cook",
      email: "tom.cook@example.com",
      password: "PasswordT",
    },
    {
      username: "waltonL",
      firstName: "Lindsay",
      lastName: "Walton",
      email: "lwastson@example.com",
      password: "PasswordL",
    },
    {
      username: "blake.reid",
      firstName: "Blake",
      lastName: "Reid",
      email: "blakereid@example.com",
      password: "PasswordB",
    },
    {
      username: "benjaminR",
      firstName: "Benjamin",
      lastName: "Russel",
      email: "BenjaminRussel@example.com",
      password: "PasswordB",
    },
    {
      username: "vikk",
      firstName: "Vikram",
      lastName: "Kumar",
      email: "vikk@example.com",
      password: "PasswordV",
    },
  ];
  const users = usersSeedData.forEach((data) => {
    User.create(data);
  });
  await User.create({
    username: "hari01",
    firstName: "Hari",
    lastName: "Shah",
    email: "hari@example.com",
    password: "PasswordH",
  });
  console.log("✓ Users");
  // initialise workspaces
  await Workspace.deleteMany(); // remove existing
  let workspacesSeedData = [];
  const workspaces = Workspace.insertMany([...workspacesSeedData]);
  console.log("✓ Workspaces");
  // initlialise schedules
  await Schedule.deleteMany(); // remove existing
  let schedulesSeedData = [];
  const schedules = Schedule.insertMany([...schedulesSeedData]);
  console.log("✓ Schedules");
  // initiliase entries
  await Entry.deleteMany(); // remove existing
  let entriesSeedData = [];
  const entries = Entry.insertMany([...entriesSeedData]);
  console.log("✓ Entries");
  // initialise journals
  await Journal.deleteMany(); // remove existing
  let journalsSeedData = [];
  const journals = Journal.insertMany([...journalsSeedData]);
  console.log("✓ Journals");
  // acknowledge end
  console.log("...completed!");
  // exit from console
  process.exit();
});
