import { User } from "@models";
import { updateAmountInDB } from "@utils";
import { Router } from "express";

const router = Router();

router.post("/", async (req, res) => {
  const {
    merchID,
    quantity,
    merchSize,
    currentUser: { uid },
  } = req.body;

  if (!merchID || !quantity || !merchSize) {
    return res.status(400).send({
      message: "Please provide merch id, size and quantity",
    });
  }

  try {
    const update = await User.updateOne(
      { uid, "cart.items.id": merchID },
      {
        $set: {
          "cart.items.$.quantity": quantity,
          "cart.items.$.merchSize": merchSize,
        },
      },
      { safe: true, multi: false },
    );
    if (!update.modifiedCount) {
      return res.status(404).send({
        message: "Item not in cart",
      });
    }
    await updateAmountInDB(uid);
    res.status(200).send({
      message: "Successfully updated item.",
    });
  } catch (error) {
    res.status(500).send({
      message: "Error updating item.",
    });
  }
});

export default router;
