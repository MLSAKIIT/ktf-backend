import { User } from "@models";
import { newAmount } from "@utils";

export const updateAmountInDB = async (uid: string) => {
  try {
    const user = await User.findOne({ uid }, "cart.items cart.couponApplied cart.coupon -_id");
    const amount = await newAmount(user.cart.items, user.cart.couponApplied, user.cart.coupon);
    await User.updateOne(
      { uid },
      { $set: { "cart.amount": amount } },
      { safe: true, multi: false },
    );
  } catch (err) {
    throw new Error((err as string).toString());
  }
};
