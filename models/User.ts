import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
    default: 0,
  },
  couponApplied: {
    type: Boolean,
    required: true,
    default: false,
  },
  items: [],
});

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
  cart: CartSchema,
  orders: [],
  eventRegistered: [],
});

export const User = mongoose.model("users", UserSchema);
