import { Router } from "express";
import { User } from "@models";

const router = Router();

router.post("/", async (req, res) => {
  const { displayName, email, photoURL, uid } = req.body;

  // Check if any of the fields are empty
  if (!displayName || !email || !photoURL) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  // Check if user already exists
  const user = await User.findOne({ uid });
  if (user) {
    // Not an error, because google login can also send the data.
    return res.status(200).json({
      message: "User already exists",
    });
  }
  // Create a new user
  try {
    const newUser = new User({
      uid,
      displayName,
      email,
      photoURL,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    await newUser.save();
    return res.status(200).json({
      message: "User created successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
});

export default router;
