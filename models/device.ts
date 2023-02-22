import mongoose, { Schema, Document, Date } from "mongoose";

export interface DeviceDocument extends Document {
  deviceName: string;
  deviceType: string;
  deviceImei: string;
  location: string;
  owner: string;
  status: string;
  loggingStatus: string;
  createdAt: Date;
}

const DeviceSchema: Schema = new Schema({
  deviceName: { type: String, required: [true, "Device must have a name"] },
  deviceType: {
    type: String,
    required: [true, "Device type must be defined"],
  },
  deviceImei: { type: mongoose.Types.ObjectId },
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
  loggingStatus: {
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
