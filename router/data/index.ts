import { authCheck } from "@middleware";
import { Router } from "express";
import cart from "./cart";
import events from "./events";
import merch from "./merchs";
import user from "./user";
import myOrders from "./myOrders";

const router = Router();

router.use("/events", events);
router.use("/merchs", merch);
router.use("/cart", authCheck, cart);
router.use("/user", authCheck, user);
router.use("/my-orders", authCheck, myOrders);

export default router;
