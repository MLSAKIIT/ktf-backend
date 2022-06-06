import { Router } from "express";
import { authCheck } from "@middleware";
import add from "./add";
import remove from "./remove";
import update from "./update";
import addCoupon from "./addCoupon";
import removeCoupon from "./removeCoupon";
// import saveLocalCart from "./saveLocalCart";

const router = Router();

router.use("/add", authCheck, add);
router.use("/remove", authCheck, remove);
router.use("/update", authCheck, update);
router.use("/add-coupon", authCheck, addCoupon);
router.use("/remove-coupon", authCheck, removeCoupon);
// router.use("/save-local-cart", authCheck, saveLocalCart);

export default router;
