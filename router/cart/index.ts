import { Router } from "express";
import saveLocalStorage from "./saveLocalStorage";
import add from "./add";
import remove from "./remove";
import { authCheck } from "@middleware";

const router = Router();

router.use("/register", saveLocalStorage);
router.use("/add", authCheck, add);
router.use("/remove", remove);

export default router;
