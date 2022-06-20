import { Router } from "express";
import { User } from "@models";

const router = Router();

router.post("/", async (req, res) => {
  const { uid, eventID } = req.body;

  if (!uid || !eventID) {
    return res.status(400).send({
      message: "Missing uid or eventID",
    });
  }

  try {
    const user = await User.findOne({ uid }, "eventRegistered -_id");

    if (!user) {
      return res.status(400).send({
        message: "User not found",
      });
    }

    const { eventRegistered } = user;

    let isRegistered = false;
    let eventData: any;

    if (!eventRegistered || eventRegistered?.length === 0) {
      return res.status(200).json({
        message: "User not registered for the event",
      });
    }

    eventRegistered.map((event: any) => {
      if (event.eventID === eventID) {
        isRegistered = true;
        eventData = {
          name: event.name,
          eventID: event.eventID,
          checkedIn: event.checkedIn,
          eventDate: event.eventDate,
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
  } catch (error: any) {
    return res.status(500).json({
      message: "Something went wrong",
      error: error.toString(),
    });
  }
});

export default router;
