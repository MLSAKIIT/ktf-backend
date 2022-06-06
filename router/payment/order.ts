import { Router } from "express";
import { User } from "@models";
import Razorpay from "razorpay";
import { RAZORPAY_ID, RAZORPAY_SECRET } from "@constants";
import { uid as shortUID } from "uid";

const router = Router();

router.get("/", async (req, res) => {
  const uid = "0ePnSHf7CnMoq61ZiBfiLxarDrA2";
  const user = await User.findOne({ uid }, "cart -_id");
  // const update = await User.updateOne(
  //     { uid },
  //     {
  //       $set: {
  //         "cart.items.orderId": quantity,
  //       },
  //     },
  //     { safe: true, multi: false },
  //   );
  try {
    const { cart } = user;
    const amount = cart.amount * 100;
    const currency = "INR";
    const receipt = `Receipt#${shortUID(8)}`;
    const instance = new Razorpay({ key_id: RAZORPAY_ID, key_secret: RAZORPAY_SECRET });
    // const order = await instance.orders.create({
    //     amount,
    //     currency,
    //     receipt,
    //     notes: {
    //         uid,
    //     }
    // })
    // if(!order){
    //     return res.send({
    //         error: "Order not created"
    //     })
    // }
    // res.json(order)
    return res.status(200).json({
      amount,
      currency,
      receipt,
      notes: {
        uid,
      },
    });
  } catch (err) {
    return res.status(500).json({
      message: "Error creating order",
    });
  }
});

export default router;
