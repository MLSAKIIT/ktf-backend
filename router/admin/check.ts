import { Router } from "express";
import { Coupon, User } from "@models";

const router = Router();

router.post("/", async (req, res) => {
  const { uid, eventID } = req.body;
  try {
    const user = await User.findOne({ uid }, "eventRegistered -_id");
    const { eventRegistered } = user;
    let isRegistered = false;
    let eventData: any;
    eventRegistered.map((event: any) => {
      if (event.eventID === eventID) {
        if (event.checkedIn) {
          return res.status(400).json({
            message: "User already checked in",
          });
        }
        isRegistered = true;
        eventData = {
          ...event,
        };
      }
    });

    if (!isRegistered) {
      return res.status(400).json({
        message: `User not registered for the event`,
      });
    }
    return res.status(200).json({
      message: `User registered for the ${eventData.name}`,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
});

export default router;
