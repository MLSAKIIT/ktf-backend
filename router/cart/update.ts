import { User } from "@models";
import { updateAmountInDB } from "@utils";
import { Router } from "express";

const router = Router();

router.post("/", async (req, res) => {
  const {
    currentUser: { uid },
  } = req.body;

  try {
    await updateAmountInDB(uid);
  } catch (error) {
    res.status(500).send({
      message: "Error updating item.",
    });
  }
  res.send("update");
});

export default router;
