import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  displayName: String,
  email: String,
  phoneNumber: Number,
  photoURL: String,
  uid: String,
  college: String,
  graduationYear: Number,
  course: String,
  dob: String,
  gender: String,
  address: String,
  state: String,
  pinCode: Number,
  qrCodeUrl: String,
  createdAt: String,
  orders: [],
  score: String,
  eventRegistered: [],
});

export const User = mongoose.models.User || mongoose.model("User", UserSchema);
