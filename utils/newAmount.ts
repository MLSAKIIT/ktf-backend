import { COUPON_DISCOUNT } from "@constants";

export const newAmount = (items: any[], couponApplied: boolean) => {
  let newAmount: number = items.reduce((acc, item) => acc + item.price, 0);

  if (couponApplied) {
    newAmount = parseInt((newAmount * COUPON_DISCOUNT).toFixed(0));
  }
  return newAmount;
};
