import mongoose from "mongoose";

const CouponSchema = new mongoose.Schema({
  code: String,
  discount: Number,
  type: String,
  description: String,
  count: { type: Number, default: 0 },
  userUids: [],
});

export const Coupon = mongoose.model("coupons", CouponSchema);
