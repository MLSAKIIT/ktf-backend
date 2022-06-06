import { Coupon } from "@models";

export const verifyCoupon = async (coupon: string) => {
  try {
    const couponFromDB = await Coupon.findOne({ code: coupon }, "discount -_id");
    if (!couponFromDB) {
      return {
        isValid: false,
      };
    }
    const { discount } = couponFromDB;
    return {
      isValid: true,
      discount,
    };
  } catch (err) {
    return {
      isValid: false,
    };
  }
};
