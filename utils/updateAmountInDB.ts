import { User } from "@models";
import { newAmount } from "@utils";

export const updateAmountInDB = async (uid: string) => {
  try {
    const user = await User.findOne({ uid }, "cart.items cart.couponApplied -_id");
    const amount = newAmount(user.cart.items, user.cart.couponApplied);
    await User.updateOne(
      { uid },
      { $set: { "cart.amount": amount } },
      { safe: true, multi: false },
    );
  } catch (err) {
    throw new Error((err as string).toString());
  }
};
