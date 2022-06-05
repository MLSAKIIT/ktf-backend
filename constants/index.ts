export const PORT = process.env.PORT || 8000;
export const MONGO_URI: string = process.env.MONGO_URI || "mongodb://localhost/ktf";
export const COUPON_DISCOUNT = 0.9; // 10% discount
export const SEED_DATA = process.env.SEED_DATA
  ? parseInt(process.env.SEED_DATA, 10)
  : undefined || 1;

interface coupon {
  COUPON_CODE: "KIIT20";
  COUPON_DISCOUNT: 0.9;
  COUPON_TYPE: "collab" | "ca";
  COUPON_DESCRIPTION: "10% discount on all collab and ca events";
  count: 0;
}
