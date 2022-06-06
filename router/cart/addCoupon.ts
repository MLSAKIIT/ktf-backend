import { Router } from "express";
import { User } from "@models";
import { updateAmountInDB, verifyCoupon } from "@utils";

const router = Router();

router.post("/", async (req, res) => {
  const {
    coupon,
    currentUser: { uid },
  } = req.body;
  if (!coupon) {
    return res.status(400).json({
      message: "Coupon is required.",
    });
  }

  try {
    const couponCheck = await verifyCoupon(coupon);
    if (!couponCheck.isValid) {
      return res.status(400).send({
        message: "Invalid coupon",
      });
    }
    const update = await User.updateOne(
      { uid },
      {
        $set: {
          "cart.coupon": coupon,
          "cart.couponApplied": true,
        },
      },
      { safe: true, multi: false, upsert: true },
    );

    if (!update.modifiedCount) {
      return res.status(404).send({
        message: "User not found or coupon already applied",
      });
    }

    await updateAmountInDB(uid);

    res.status(200).send({
      message: "Coupon applied successfully",
    });
  } catch (err) {
    res.status(500).send({
      message: (err as string).toString(),
    });
  }
});

export default router;
