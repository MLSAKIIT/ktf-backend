import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  uid: String,
  items: [],
  orderID: String,
  amount: Number,
  couponApplied: { type: Boolean, default: false },
  completed: { type: Boolean, default: false },
  razorpay_payment_id: String,
  created_order_id: String,
  razorpay_order_id: String,
  razorpay_signature: String,
  //   other_details: String,????
});

export const Order = mongoose.model("orders", OrderSchema);
