import { User } from "@models";
import { Router } from "express";

const router = Router();

router.get("/", async (req, res) => {
  const {
    currentUser: { uid },
  } = req.body;

  try {
    const user = await User.findOne({ uid }, "cart -_id ");
    const { cart } = user;
    res.status(200).json(cart);
  } catch (err: any) {
    res.status(500).json(err);
    return res.status(500).json({
      message: err.toString(),
    });
  }
});

export default router;
