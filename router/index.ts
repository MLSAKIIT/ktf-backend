import { Router } from "express";
import authRouter from "./auth";
import dataRouter from "./data";
import cartRouter from "./cart";
import ping from "./ping";

const router = Router();

router.use("/ping", ping);
router.use("/auth", authRouter);
router.use("/data", dataRouter);
router.use("/cart", cartRouter);

export default router;
