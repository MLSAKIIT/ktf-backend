import { User } from "@models";
import { Router } from "express";

const router = Router();

router.get("/", async (req, res) => {
  const { currentUser } = req.body;

  const user = await User.findOne({ uid: currentUser.uid });
  if (!user) {
    return res.status(404).send({
      error: "User not found",
    });
  }
  const {
    displayName,
    email,
    photoURL,
    uid,
    cart,
    createdAt,
    updatedAt,
    orders,
    eventRegistered,
    address,
    college,
    course,
    dob,
    gender,
    graduationYear,
    phoneNumber,
    pinCode,
    qrCodeUrl,
    state,
  } = user;
  const userDetails = {
    displayName,
    email,
    photoURL,
    uid,
    cart,
    createdAt,
    updatedAt,
    orders,
    eventRegistered,
    address,
    college,
    course,
    dob,
    gender,
    graduationYear,
    phoneNumber,
    pinCode,
    qrCodeUrl,
    state,
  };
  res.status(200).json(userDetails);
});

export default router;
