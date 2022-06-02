import { Router } from "express";
import { Event } from "@models";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const events = await Event.find({});
    res.status(200).json(events);
  } catch (err: any) {
    res.status(500).json(err);
    return res.status(500).json({
      message: err.toString(),
    });
  }
});

export default router;
