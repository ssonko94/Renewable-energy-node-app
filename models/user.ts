import mongoose, { Schema, Document } from "mongoose";

export interface UserDocument extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  rights: string;
  confirmationCode: string;
  status: string;
}

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  rights: {
    type: String,
    required: true,
  },
  confirmationCode: {
    type: String,
    unique: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Active"],
    default: "Pending",
  },
});

const User = mongoose.model<UserDocument>("User", userSchema);

export { User };
