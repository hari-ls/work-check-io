// import mongoose
const mongoose = require("mongoose");
// schema constructor
const { Schema } = mongoose;
// build schema
const workspaceSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    limit: {
      type: Number,
      default: 1,
      min: 1,
      max: 25,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    users: [
      {
        userId: { type: Schema.Types.ObjectId, ref: "User" },
        jobTitle: { type: String, maxlength: 160 },
      },
    ],
  },
  { timestamps: true, versionKey: false }
);
// define collection name
const collectionName = "workspaces";
// create model
const Workspace = mongoose.model("Workspace", workspaceSchema, collectionName);
// export model
module.exports = Workspace;
