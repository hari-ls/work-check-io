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
  // initialise workspaces
  await Workspace.deleteMany(); // remove existing
  let workspacesSeedData = [
    {
      name: "Acme, Inc",
      slug: "acme",
      limit: 3,
      owner: users[0]._id,
      users: [
        {
          userId: users[0]._id,
          jobTitle: "Director",
        },
        {
          userId: users[1]._id,
          jobTitle: "Sales Exec",
        },
        {
          userId: users[2]._id,
          jobTitle: "Accountant",
        },
      ],
    },
    {
      name: "J Firm",
      slug: "j-firm",
      limit: 1,
      owner: users[3]._id,
      users: [
        {
          userId: users[3]._id,
          jobTitle: "Owner",
        },
      ],
    },
    {
      name: "LS Tech",
      slug: "ls-tech",
      limit: 9,
      owner: users[12]._id,
      users: [
        {
          userId: users[12]._id,
          jobTitle: "CEO",
        },
        {
          userId: users[4]._id,
          jobTitle: "CFO",
        },
        {
          userId: users[5]._id,
          jobTitle: "CTO",
        },
        {
          userId: users[6]._id,
          jobTitle: "COO",
        },
        {
          userId: users[7]._id,
          jobTitle: "CMO",
        },
        {
          userId: users[8]._id,
          jobTitle: "BDM",
        },
        {
          userId: users[9]._id,
          jobTitle: "Team Lead",
        },
        {
          userId: users[10]._id,
          jobTitle: "Graphics Designer",
        },
        {
          userId: users[11]._id,
          jobTitle: "Full Stack Developer",
        },
      ],
    },
  ];
  const workspaces = await Workspace.insertMany([...workspacesSeedData]);
  console.log("✓ Workspaces");
  // initlialise schedules
  await Schedule.deleteMany(); // remove existing
  let schedulesSeedData = [
    {
      workspace: workspaces[0]._id,
      name: "Workdays",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      weeklyHours: 38,
      checkInAllowedOn: ["MON", "TUE", "WED", "THU", "FRI"],
      users: [
        workspaces[0].users[0]._id,
        workspaces[0].users[1]._id,
        workspaces[0].users[2]._id,
      ],
    },
    {
      workspace: workspaces[1]._id,
      name: "Weekly",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      weeklyHours: 45,
      checkInAllowedOn: ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"],
      users: [workspaces[1].users[0]._id],
    },
    {
      workspace: workspaces[2]._id,
      name: "Weekdays",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      weeklyHours: 38,
      checkInAllowedOn: ["MON", "TUE", "WED", "THU", "FRI"],
      users: [
        workspaces[2].users[0]._id,
        workspaces[2].users[1]._id,
        workspaces[2].users[2]._id,
        workspaces[2].users[3]._id,
        workspaces[2].users[4]._id,
      ],
    },
    {
      workspace: workspaces[2]._id,
      name: "Alternate I",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      weeklyHours: 24,
      checkInAllowedOn: ["TUE", "THU", "FRI"],
      users: [workspaces[2].users[8]._id, workspaces[2].users[5]._id],
    },
    {
      workspace: workspaces[2]._id,
      name: "Alternate II",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      weeklyHours: 24,
      checkInAllowedOn: ["MON", "WED", "SAT"],
      users: [workspaces[2].users[6]._id, workspaces[2].users[7]._id],
    },
  ];
  const schedules = await Schedule.insertMany([...schedulesSeedData]);
  console.log("✓ Schedules");
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
    [5, 13, 9, 0],
    [5, 12, 9, 5],
    [5, 11, 9, 10],
    [5, 10, 9, 0],
    [5, 9, 9, 5],
    [5, 6, 9, 6],
    [5, 5, 9, 23],
    [5, 4, 9, 4],
    [5, 3, 9, 5],
    [5, 2, 9, 4],
    [4, 29, 9, 10],
    [4, 22, 9, 0],
    [4, 23, 9, 0],
    [4, 24, 9, 0],
    [4, 25, 9, 0],
    [4, 22, 9, 4],
    [4, 15, 9, 1],
    [4, 16, 9, 3],
    [4, 17, 9, 18],
    [4, 18, 9, 0],
  ]; // template set
  let timeSet2 = [
    [5, 13, 12, 2],
    [5, 12, 12, 0],
    [5, 10, 12, 7],
    [5, 6, 12, 0],
    [5, 5, 12, 4],
    [5, 3, 12, 3],
    [4, 29, 12, 12],
    [4, 28, 12, 15],
    [4, 26, 12, 10],
    [4, 22, 12, 6],
    [4, 21, 12, 30],
    [4, 19, 12, 5],
  ]; // template set
  let timeSet3 = [
    [5, 14, 18, 0],
    [5, 11, 18, 12],
    [5, 9, 18, 10],
    [5, 7, 18, 5],
    [5, 4, 18, 3],
    [5, 2, 18, 4],
    [4, 30, 18, 0],
    [4, 27, 18, 15],
    [4, 25, 18, 30],
    [4, 23, 18, 7],
    [4, 20, 18, 5],
    [4, 18, 18, 8],
  ]; // template set
  let entriesSeedData = []; // initialise blank array
  function addEntries1() {
    timeSet1.forEach((set) => {
      let dataObj = {
        workspace: workspaces[2]._id,
        user: workspaces[2].users[0]._id,
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
        workspace: workspaces[2]._id,
        user: workspaces[2].users[5]._id,
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
        workspace: workspaces[2]._id,
        user: workspaces[2].users[7]._id,
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
        workspace: workspaces[1]._id,
        user: workspaces[1].users[0]._id,
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
        workspace: workspaces[0]._id,
        user: workspaces[0].users[0]._id,
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
        workspace: workspaces[0]._id,
        user: workspaces[0].users[1]._id,
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
  // initialise journals
  await Journal.deleteMany(); // remove existing
  const journalEntries1 = await Entry.find(
    {
      workspace: workspaces[0]._id,
      user: workspaces[0].users[0]._id,
      from: new Date(2022, 4, 15),
      to: new Date(2022, 5, 15),
    },
    "_id"
  ); // find relevant entry ids
  const journalEntries2 = await Entry.find(
    {
      workspace: workspaces[1]._id,
      user: workspaces[1].users[0]._id,
      from: new Date(2022, 4, 15),
      to: new Date(2022, 5, 15),
    },
    "_id"
  ); // find relevant entry ids
  const journalEntries3 = await Entry.find(
    {
      workspace: workspaces[2]._id,
      user: workspaces[2].users[0]._id,
      from: new Date(2022, 4, 15),
      to: new Date(2022, 5, 15),
    },
    "_id"
  ); // find relevant entry ids
  const journalEntries4 = await Entry.find(
    {
      workspace: workspaces[2]._id,
      user: workspaces[2].users[5]._id,
      from: new Date(2022, 4, 15),
      to: new Date(2022, 5, 15),
    },
    "_id"
  ); // find relevant entry ids
  let journalsSeedData = [
    {
      workspace: workspaces[0]._id,
      user: workspaces[0].users[0]._id,
      entries: journalEntries1.map((entry) => entry._id),
      from: new Date(2022, 4, 15),
      to: new Date(2022, 5, 15),
    },
    {
      workspace: workspaces[1]._id,
      user: workspaces[1].users[0]._id,
      entries: journalEntries2.map((entry) => entry._id),
      from: new Date(2022, 4, 15),
      to: new Date(2022, 5, 15),
    },
    {
      workspace: workspaces[2]._id,
      user: workspaces[2].users[0]._id,
      entries: journalEntries3.map((entry) => entry._id),
      from: new Date(2022, 4, 15),
      to: new Date(2022, 5, 15),
    },
    {
      workspace: workspaces[2]._id,
      user: workspaces[2].users[5]._id,
      entries: journalEntries4.map((entry) => entry._id),
      from: new Date(2022, 4, 15),
      to: new Date(2022, 5, 15),
    },
  ];
  const journals = await Journal.insertMany([...journalsSeedData]);
  console.log("✓ Journals");
  // acknowledge end
  console.log("...completed!");
  // exit from console
  process.exit();
});
