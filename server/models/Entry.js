// import mongoose
const mongoose = require("mongoose");
// schema constructor
const { Schema } = mongoose;
// build schema
const entrySchema = new Schema({
  workspace: {
    type: Schema.Types.ObjectId,
    ref: "Workspace",
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  checkIn: {
    type: Date,
  },
  checkOut: {
    type: Date,
  },
  plan: {
    type: String,
  },
  summary: {
    type: String,
  },
  productivity: {
    type: Number,
    min: 1,
    max: 10,
  },
  mood: {
    type: String,
    enum: ["happy", "sad", "frown"],
  },
});
// define collection name
const collectionName = "entries";
// create model
const Entry = mongoose.model("Entry", entrySchema, collectionName);
// export model
module.exports = Entry;
