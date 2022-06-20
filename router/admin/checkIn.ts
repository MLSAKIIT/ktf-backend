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

    if (!eventRegistered || eventRegistered?.length === 0) {
      return res.status(200).json({
        message: "User not registered for the event",
      });
    }

    let isRegistered = false;
    let eventData: any;
    eventRegistered.map(async (e: any) => {
      if (e.eventID === eventID) {
        isRegistered = true;
        eventData = e;
      }
    });

    if (!isRegistered) {
      return res.status(200).json({
        message: "User not registered for the event",
      });
    }

    if (eventData.checkedIn) {
      return res.status(400).json({
        message: "User already checked in",
      });
    }

    const update = await User.updateOne(
      {
        uid,
        "eventRegistered.eventID": typeof eventID === "string" ? parseInt(eventID, 10) : eventID,
      },
      {
        $set: {
          "eventRegistered.$.checkedIn": true,
        },
      },
      { safe: true, multi: false },
    );

    if (!update.modifiedCount) {
      return res.status(404).send({
        message: "Unable to check in user",
      });
    }

    return res.status(200).json({
      message: `Successfully checked in`,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
});

export default router;
