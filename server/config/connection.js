// import mongoose
const mongoose = require("mongoose");
// set connection uri
const URI = process.env.ATLAS_URI || "mongodb://127.0.0.1:27017/work-check-io";
// establish connection
mongoose.connect(URI);
const db = mongoose.connection;
// log status
db.on("error", (err) => console.log(`Error: ${err}`));
db.on("connected", (err, res) => console.log("Connected to databse"));
// export connection
module.exports = db;
