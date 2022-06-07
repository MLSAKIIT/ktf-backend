import { Router } from "express";
import { User } from "@models";
import Razorpay from "razorpay";
import { RAZORPAY_ID, RAZORPAY_SECRET } from "@constants";
import { uid as shortUID } from "uid";

const router = Router();

router.get("/", async (req, res) => {
  const {
    currentUser: { uid },
  } = req.body;
  try {
    const user = await User.findOne({ uid }, "cart -_id");
    const { cart } = user;
    const amount = cart.amount * 100;
    const currency = "INR";
    const receipt = `Receipt#${shortUID(8)}`;
    const instance = new Razorpay({ key_id: RAZORPAY_ID, key_secret: RAZORPAY_SECRET });
    const order = await instance.orders.create({
      amount,
      currency,
      receipt,
      notes: {
        uid,
      },
    });
    if (!order) {
      return res.status(500).send({
        message: "Error creating order",
      });
    }
    return res.status(200).json({
      orderID: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Error creating order",
    });
  }
});

export default router;
