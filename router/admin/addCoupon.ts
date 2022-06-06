import { Router } from "express";
import { Coupon } from "@models";

const router = Router();

router.post("/", async (req, res) => {
  const { code, discount, type, description } = req.body;

  if (!code || !discount || !type || !description) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  try {
    const newCoupon = new Coupon({
      code,
      discount,
      type,
      description,
    });
    await newCoupon.save();
    return res.status(200).json({
      message: "Coupon created successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
});

export default router;
