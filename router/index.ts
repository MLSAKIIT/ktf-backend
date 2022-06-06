import { Router } from "express";
import authRouter from "./auth";
import dataRouter from "./data";
import cartRouter from "./cart";
import paymentRouter from "./payment";
import adminRouter from "./admin";
import ping from "./ping";

const router = Router();

router.use("/ping", ping);
router.use("/auth", authRouter);
router.use("/data", dataRouter);
router.use("/cart", cartRouter);
router.use("/payment", paymentRouter);
router.use("/admin", adminRouter);

export default router;
