import mongoose, { Schema, Document, Date } from "mongoose";

export interface DeviceDocument extends Document {
  device_name: string;
  device_type: string;
  device_imei: string;
  location: string;
  owner: string;
  status: string;
  logging_status: string;
  createdAt: Date;
}

const DeviceSchema: Schema = new Schema({
  device_name: { type: String, required: [true, "Device must have a name"] },
  device_type: {
    type: String,
    required: [true, "Device type must be defined"],
  },
  device_imei: { type: mongoose.Types.ObjectId },
  location: { type: String, required: [true, "Device must have a location"] },
  data: { type: Map, of: String },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Device must belong to a user"],
  },
  status: {
    type: String,
    enum: ["active", "deactive", "offline", "online", "deleted"],
    default: "active",
  },
  logging_status: {
    type: String,
    enum: ["offline", "online"],
    default: "offline",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

// Compile the IoT Data Schema into a Model
export const Device = mongoose.model<DeviceDocument>("Device", DeviceSchema);
