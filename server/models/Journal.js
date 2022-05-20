// import mongoose
const mongoose = require("mongoose");
// schema constructor
const { Schema } = mongoose;
// build schema
const journalSchema = new Schema(
  {
    workspace: {
      type: Schema.Types.ObjectId,
      ref: "Workspace",
    },
    member: {
      type: Schema.Types.ObjectId,
      ref: "Workspace.members",
    },
    entries: [
      {
        type: Schema.Types.ObjectId,
        ref: "Entry",
      },
    ],
    from: {
      type: Date,
    },
    to: {
      type: Date,
    },
  },
  { timestamps: true, versionKey: false }
);
// define collection name
const collectionName = "journals";
// create model
const Journal = mongoose.model("Journal", journalSchema, collectionName);
// export model
module.exports = Journal;
