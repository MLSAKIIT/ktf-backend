import { Router } from "express";
import saveLocalCart from "./saveLocalCart";
import add from "./add";
import remove from "./remove";
import update from "./update";
import { authCheck } from "@middleware";

const router = Router();

router.use("/save-local-cart", saveLocalCart);
router.use("/add", authCheck, add);
router.use("/remove", authCheck, remove);
router.use("/update", authCheck, update);

export default router;
