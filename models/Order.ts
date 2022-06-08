import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  uid: String,
  orderID: String,
  paymentID: String,
  signature: String,
  amount: Number,
  couponApplied: { type: Boolean, default: false },
  coupon: String,
  items: [],
  paidAmount: Number,
  currency: String,
  method: String,
  status: String,
  description: String,
  email: String,
  contact: String,
  fee: Number,
  created_at: String,
  tax: Number,
});

export const Order = mongoose.model("orders", OrderSchema);
