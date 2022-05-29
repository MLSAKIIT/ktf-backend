import { Router } from "express";
import googleData from "./googleData";
import userData from "./userData";
import { authCheck } from "@middleware";

const router = Router();

router.use("/google-data", authCheck, googleData);
router.use("/user-data", authCheck, userData);

export default router;
``;
