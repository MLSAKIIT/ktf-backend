import { Router } from "express";
import { adminCheck } from "@middleware";
import addCoupons from "./addCoupon";
import check from "./check";
import checkIn from "./checkIn";

const router = Router();

router.use("/add-coupons", adminCheck, addCoupons);
router.use("/check", adminCheck, check);
router.use("/check-in", adminCheck, checkIn);

export default router;
