import mongoose, { Schema, Document, Date } from "mongoose";

export interface DataDocument extends Document {
  deviceImei: string;
  current: number;
  voltage: number;
  power: number;
  createdAt: Date;
}

const dataSchema = new Schema({
  deviceImei: {
    type: String,
    required: [true, "you must supply deviceID"],
  },
  current: {
    type: Number,
    required: [true, "you must suppy a current value"],
  },
  voltage: {
    type: Number,
    required: [true, "you must suppy a voltage value"],
  },
  power: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Data = mongoose.model("Data", dataSchema);
module.exports = Data;
