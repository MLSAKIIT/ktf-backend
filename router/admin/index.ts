import { Router } from "express";
import { adminCheck } from "@middleware";
// import login from "./login"
// import register from "./register"
import addCoupons from "./addCoupon";

const router = Router();

// router.use("/login", adminCheck, login);
// router.use("/register", adminCheck, register);
router.use("/add-coupons", addCoupons); // admin check should be added.

export default router;
