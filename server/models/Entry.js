// import mongoose
const mongoose = require("mongoose");
const moment = require("moment");
// schema constructor
const { Schema } = mongoose;
// build schema
const entrySchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  checkIn: {
    type: Date,
    required: true,
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
    enum: ["HAPPY", "SAD", "FROWN"],
  },
});
// defining virtuals
entrySchema.set("toObject", { virtuals: true });
entrySchema.set("toJSON", { virtuals: true });
// get total duration
entrySchema.virtual("duration").get(function () {
  // check if checkOut is not null
  // -- calculate total duration between checkIn & checkOut
  return "8";
});
// define collection name
const collectionName = "entries";
// create model
const Entry = mongoose.model("Entry", entrySchema, collectionName);
// export model
module.exports = Entry;
