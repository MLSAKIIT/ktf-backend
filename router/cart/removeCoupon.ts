import { Router } from "express";
import { User } from "@models";
import { updateAmountInDB } from "@utils";

const router = Router();

router.get("/", async (req, res) => {
  const {
    currentUser: { uid },
  } = req.body;

  try {
    const update = await User.updateOne(
      { uid },
      {
        $set: {
          "cart.coupon": "",
          "cart.couponApplied": false,
        },
      },
      { safe: true, multi: false, upsert: true },
    );

    if (!update.modifiedCount) {
      return res.status(404).send({
        message: "No coupon applied",
      });
    }

    await updateAmountInDB(uid);

    res.status(200).send({
      message: "Coupon removed successfully",
    });
  } catch (err) {
    res.status(500).send({
      message: (err as string).toString(),
    });
  }
});

export default router;
