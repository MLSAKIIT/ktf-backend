import { authCheck } from "@middleware";
import { Router } from "express";
import cart from "./cart";
import events from "./events";
import members from "./members";
import merch from "./merchs";
import sponsors from "./sponsors";
import user from "./user";

const router = Router();

router.use("/cart", cart);
router.use("/events", events);
router.use("/members", members);
router.use("/merchs", merch);
router.use("/sponsors", sponsors);
router.use("/user", authCheck, user);

export default router;
