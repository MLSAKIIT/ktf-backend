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
        message: "Already checked in or not registered for event",
        update: JSON.stringify(update)
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
