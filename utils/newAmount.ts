import { verifyCoupon } from "@utils";

export const newAmount = async (items: any[], couponApplied: boolean, coupon: string) => {
  let newAmount: number = items.reduce((acc, item) => {
    return item.type === "event" ? acc + item.price : acc + item.price * item.quantity;
  }, 0);

  if (couponApplied) {
    newAmount = parseInt((newAmount * (await verifyCoupon(coupon)).discount).toFixed(0));
  }
  return newAmount;
};
