// import mongoose
const mongoose = require("mongoose");
// schema constructor
const { Schema } = mongoose;
// build schema
const scheduleSchema = new Schema(
  {
    workspace: {
      type: Schema.Types.ObjectId,
      ref: "Workspace",
    },
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    weeklyHours: {
      type: Number,
      required: true,
    },
    checkInAllowedOn: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true, versionKey: false }
);
// define collection name
const collectionName = "schedules";
// create model
const Schedule = mongoose.model("Schedule", scheduleSchema, collectionName);
// export model
module.exports = Schedule;
