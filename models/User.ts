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
  score: String,
  createdAt: Date,
  updatedAt: Date,
  cart: [],
  orders: [],
  eventRegistered: [],
});

export const User = mongoose.model("users", UserSchema);
