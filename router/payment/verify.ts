import { Router } from "express";
import Razorpay from "razorpay";
import crypto from "crypto";
import { Order, User } from "@models";
import { RAZORPAY_ID, RAZORPAY_SECRET } from "@constants";

const router = Router();

router.post("/", async (req, res) => {
  const {
    orderID,
    razorpayPaymentID,
    razorpaySignature,
    currentUser: { uid },
  } = req.body;

  if (!orderID || !razorpayPaymentID || !razorpaySignature) {
    return res.status(400).json({
      message: "Please provide all required fields",
    });
  }

  try {
    const hash = crypto
      .createHmac("sha256", RAZORPAY_SECRET as string)
      .update(`${orderID}|${razorpayPaymentID}`)
      .digest("hex");

    if (hash !== razorpaySignature) {
      return res.status(400).json({
        message: "Invalid signature",
      });
    }

    const user = await User.findOne({ uid }, "cart eventRegistered -_id");
    const { cart, eventRegistered } = user;
    const razorpay = new Razorpay({ key_id: RAZORPAY_ID, key_secret: RAZORPAY_SECRET });
    const paymentDetails = await razorpay.payments.fetch(razorpayPaymentID);
    const {
      amount: paidAmount,
      currency,
      method,
      status,
      description,
      email,
      contact,
      fee,
      created_at,
      tax,
    } = paymentDetails;
    const newOrder = new Order({
      uid,
      orderID,
      paymentID: razorpayPaymentID,
      signature: razorpaySignature,
      amount: cart.amount,
      couponApplied: cart.couponApplied,
      coupon: cart.coupon,
      items: cart.items,
      paidAmount: paidAmount / 100,
      currency,
      method,
      status,
      description,
      email,
      contact,
      fee,
      createdAt: new Date(created_at),
      tax,
    });
    let newEventRegistered = [...eventRegistered];
    cart.items.map((item: any) => {
      if (item.type === "event") {
        newEventRegistered.push({
          name: item.name,
          eventDate: item.eventDate,
          eventID: item.id,
          checkedIn: false,
        });
      }
    });

    await Promise.all([
      User.updateOne(
        { uid },
        {
          $set: {
            eventRegistered: newEventRegistered,
          },
        },
        { safe: true, multi: false, upsert: true },
      ),
      newOrder.save(),
    ]);

    await User.updateOne(
      { uid },
      {
        $set: {
          "cart.items": [],
          "cart.amount": 0,
          "cart.couponApplied": false,
          "cart.coupon": "",
        },
      },
      { safe: true, multi: false, upsert: true },
    );

    return res.status(200).json({
      message: "Data Saved Successfully",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
});

export default router;
