import { User } from "@models";
import { Router } from "express";

const router = Router();

router.get("/", async (req, res) => {
  const {
    currentUser: { uid },
  } = req.body;

  const user = await User.findOne({ uid }, "cart -_id ");
  const { cart } = user;
  res.json(cart);
});

export default router;
