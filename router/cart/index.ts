import { Router } from "express";
import saveLocalStorage from "./saveLocalStorage";
import add from "./add";
import remove from "./remove";

const router = Router();

router.use("/register", saveLocalStorage);
router.use("/add", add);
router.use("/remove", remove);

export default router;
