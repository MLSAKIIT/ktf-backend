export const PORT = process.env.PORT || 8000;
export const MONGO_URI: string = process.env.MONGO_URI || "mongodb://localhost/ktf";
export const RAZORPAY_ID = process.env.RAZORPAY_ID;
export const RAZORPAY_SECRET = process.env.RAZORPAY_SECRET;
export const RAZORPAY_VERIFICATION_SECRET = process.env.RAZORPAY_VERIFICATION_SECRET;
export const SEED_DATA = process.env.SEED_DATA
  ? parseInt(process.env.SEED_DATA, 10)
  : undefined || 1;
