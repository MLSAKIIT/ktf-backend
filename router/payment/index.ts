import { Router } from "express";
import { authCheck } from "@middleware";
import order from "./order";
import verify from "./verify";

const router = Router();

router.use("/order", authCheck, order);
router.use("/verify", verify);
// router.use("/verify", authCheck, verify);

export default router;
