import { Router } from "express";
import { authCheck } from "@middleware";
import order from "./order";

const router = Router();

// router.use("/order", authCheck, order);
router.use("/order", order);

export default router;
