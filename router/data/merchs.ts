import { Router } from "express";
import { Merch } from "@models";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const merchs = await Merch.find({});
    res.status(200).json(merchs);
  } catch (err: any) {
    res.status(500).json(err);
    return res.status(500).json({
      message: err.toString(),
    });
  }
});

export default router;
