// import mongoose
const mongoose = require("mongoose");
const moment = require("moment");
// schema constructor
const { Schema } = mongoose;
// build schema
const entrySchema = new Schema(
  {
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
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
// defining virtuals
entrySchema.set("toObject", { virtuals: true });
entrySchema.set("toJSON", { virtuals: true });
// get total duration
entrySchema.virtual("duration").get(function () {
  if (this.checkOut) {
    const outTime = moment(this.checkOut);
    const inTime = moment(this.checkIn);
    return parseFloat(outTime.diff(inTime, "hours", true).toFixed(2));
  }
});
// create model
const Entry = mongoose.model("Entry", entrySchema, "entries");
// export model
module.exports = Entry;
