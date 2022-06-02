import { User } from "@models";
import { Router } from "express";

const router = Router();

router.get("/", async (req, res) => {
  const {
    currentUser: { uid },
  } = req.body;

  const cart = await User.findOne({ uid }, { cart: 1 });
});

export default router;
