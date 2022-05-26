// import connection
const db = require("./connection");
// import models
const { User, Entry } = require("../models");
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
  await usersSeedData.forEach((data) => {
    User.create(data);
  });
  await User.create({
    username: "hari01",
    firstName: "Hari",
    lastName: "Shah",
    email: "hari@example.com",
    password: "PasswordH",
  });
  const users = await User.find({}).exec();
  console.log("✓ Users");
  // initiliase entries
  await Entry.deleteMany(); // remove existing
  const entryData = {
    plan: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    summary:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. \n- Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. \n- Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    mood: ["HAPPY", "SAD", "FROWN"],
    time: function (mon, day, hr, mi) {
      let durations = [
        [8, 0],
        [7, 30],
        [7, 0],
        [6, 30],
      ];
      const r = durations[Math.floor(Math.random() * durations.length)];
      const s1 = Math.floor(Math.random() * 59);
      const s2 = Math.floor(Math.random() * 59);
      const y = 2022;
      return {
        checkIn: new Date(y, mon, day, hr, mi, s1),
        checkOut: new Date(y, mon, day, hr + r[0], mi + r[1], s2),
      };
    },
  }; // template object
  let timeSet1 = [
    [4, 13, 9, 0],
    [4, 12, 9, 5],
    [4, 11, 9, 10],
    [4, 10, 9, 0],
    [4, 9, 9, 5],
    [4, 6, 9, 6],
    [4, 5, 9, 23],
    [4, 4, 9, 4],
    [4, 3, 9, 5],
    [4, 2, 9, 4],
    [3, 29, 9, 10],
    [3, 22, 9, 0],
    [3, 23, 9, 0],
    [3, 24, 9, 0],
    [3, 25, 9, 0],
    [3, 22, 9, 4],
    [3, 15, 9, 1],
    [3, 16, 9, 3],
    [3, 17, 9, 18],
    [3, 18, 9, 0],
  ]; // template set
  let timeSet2 = [
    [4, 13, 12, 2],
    [4, 12, 12, 0],
    [4, 10, 12, 7],
    [4, 6, 12, 0],
    [4, 5, 12, 4],
    [4, 3, 12, 3],
    [3, 29, 12, 12],
    [3, 28, 12, 15],
    [3, 26, 12, 10],
    [3, 22, 12, 6],
    [3, 21, 12, 30],
    [3, 19, 12, 5],
  ]; // template set
  let timeSet3 = [
    [4, 14, 18, 0],
    [4, 11, 18, 12],
    [4, 9, 18, 10],
    [4, 7, 18, 5],
    [4, 4, 18, 3],
    [4, 2, 18, 4],
    [3, 30, 18, 0],
    [3, 27, 18, 15],
    [3, 25, 18, 30],
    [3, 23, 18, 7],
    [3, 20, 18, 5],
    [3, 18, 18, 8],
  ]; // template set
  let entriesSeedData = []; // initialise blank array
  function addEntries1() {
    timeSet1.forEach((set) => {
      let dataObj = {
        user: users[12]._id,
        checkIn: entryData.time(...set).checkIn,
        plan: entryData.plan,
        summary: entryData.summary,
        productivity: Math.floor(Math.random() * 10) + 1,
        mood: entryData.mood[Math.floor(Math.random() * entryData.mood.length)],
        checkOut: entryData.time(...set).checkOut,
      };
      entriesSeedData.push(dataObj);
    });
  } // populate data for user
  function addEntries2() {
    timeSet2.forEach((set) => {
      let dataObj = {
        user: users[5]._id,
        checkIn: entryData.time(...set).checkIn,
        plan: entryData.plan,
        summary: entryData.summary,
        productivity: Math.floor(Math.random() * 10) + 1,
        mood: entryData.mood[Math.floor(Math.random() * entryData.mood.length)],
        checkOut: entryData.time(...set).checkOut,
      };
      entriesSeedData.push(dataObj);
    });
  } // populate data for user
  function addEntries3() {
    timeSet3.forEach((set) => {
      let dataObj = {
        user: users[7]._id,
        checkIn: entryData.time(...set).checkIn,
        plan: entryData.plan,
        summary: entryData.summary,
        productivity: Math.floor(Math.random() * 10) + 1,
        mood: entryData.mood[Math.floor(Math.random() * entryData.mood.length)],
        checkOut: entryData.time(...set).checkOut,
      };
      entriesSeedData.push(dataObj);
    });
  } // populate data for user
  function addEntries4() {
    timeSet1.forEach((set) => {
      let dataObj = {
        user: users[0]._id,
        checkIn: entryData.time(...set).checkIn,
        plan: entryData.plan,
        summary: entryData.summary,
        productivity: Math.floor(Math.random() * 10) + 1,
        mood: entryData.mood[Math.floor(Math.random() * entryData.mood.length)],
        checkOut: entryData.time(...set).checkOut,
      };
      entriesSeedData.push(dataObj);
    });
  } // populate data for user
  function addEntries5() {
    timeSet1.forEach((set) => {
      let dataObj = {
        user: users[3]._id,
        checkIn: entryData.time(...set).checkIn,
        plan: entryData.plan,
        summary: entryData.summary,
        productivity: Math.floor(Math.random() * 10) + 1,
        mood: entryData.mood[Math.floor(Math.random() * entryData.mood.length)],
        checkOut: entryData.time(...set).checkOut,
      };
      entriesSeedData.push(dataObj);
    });
  } // populate data for user
  function addEntries6() {
    timeSet1.forEach((set) => {
      let dataObj = {
        user: users[1]._id,
        checkIn: entryData.time(...set).checkIn,
        plan: entryData.plan,
        summary: entryData.summary,
        productivity: Math.floor(Math.random() * 10) + 1,
        mood: entryData.mood[Math.floor(Math.random() * entryData.mood.length)],
        checkOut: entryData.time(...set).checkOut,
      };
      entriesSeedData.push(dataObj);
    });
  } // populate data for user
  function addAllEntries() {
    addEntries1();
    addEntries2();
    addEntries3();
    addEntries4();
    addEntries5();
    addEntries6();
  } // abstraction for pushing data to array
  addAllEntries(); // execute
  const entries = await Entry.insertMany([...entriesSeedData]);
  console.log("✓ Entries");
  // acknowledge end
  console.log("...completed!");
  // exit from console
  process.exit();
});
