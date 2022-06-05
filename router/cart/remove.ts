import { User } from "@models";
import { updateAmountInDB } from "@utils";
import { Router } from "express";

const router = Router();

router.delete("/:id", async (req, res) => {
  const {
    currentUser: { uid },
  } = req.body;
  const id = req.params.id;

  if (!id) {
    return res.status(400).send({
      message: "Please provide event or merch ID",
    });
  }

  try {
    const update = await User.updateOne(
      { uid },
      {
        $pull: {
          "cart.items": {
            id: parseInt(id, 10),
          },
        },
        "cart.amount": "",
      },
      { safe: true, multi: false },
    );

    if (!update.modifiedCount) {
      return res.status(404).send({
        message: "Item not in cart",
      });
    }
    await updateAmountInDB(uid);
    res.json({
      message: "Successfully removed item from cart",
      update: JSON.stringify(update),
      user: JSON.stringify(await User.findOne({ uid })),
    });
  } catch (err) {
    return res.status(500).send({
      message: "Error deleting item from cart",
    });
  }
});

export default router;
