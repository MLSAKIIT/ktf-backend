import { Router } from "express";
import crypto from "crypto";
import { RAZORPAY_VERIFICATION_SECRET } from "@constants";
import { Order } from "@models";

const router = Router();

router.post("/", async (req, res) => {
  const body = req.body;
  try {
    const shasum = crypto.createHmac("sha256", RAZORPAY_VERIFICATION_SECRET as string);
    shasum.update(JSON.stringify(body));
    const digest = shasum.digest("hex");
    if (digest !== req.headers["x-razorpay-signature"]) {
      return res.status(400).json({
        message: "Payment verification failed",
      });
    }
    
    console.log(body);
    console.log(body.payload.payment.entity);
    
    
    const newOrder = new Order({
      ...body,
      uid: body.payload.payment.entity.notes[0].uid,
    });
    await newOrder.save();
    return res.status(200).json({
      message: "Payment verification success",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

export default router;
