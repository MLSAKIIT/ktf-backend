import { Router } from "express";
import { User } from "@models";
import { generateQr } from "@utils";
import { storage } from "@firebase";

const router = Router();

router.post("/", async (req, res) => {
  const {
    college,
    phoneNumber,
    graduationYear,
    course,
    dob,
    gender,
    address,
    state,
    pinCode,
    uid,
  } = req.body;

  // Check if any of the fields are empty
  if (
    !college ||
    !phoneNumber ||
    !graduationYear ||
    !course ||
    !dob ||
    !gender ||
    !address ||
    !state ||
    !pinCode
  ) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  // Check if user already exists
  const checkUser = await User.findOne({ uid });
  if (!checkUser) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  // Generate QR code
  const qrCode = await generateQr(uid);
  if (qrCode instanceof Error) {
    return res.status(500).json({
      message: "Unable to generate QR code",
    });
  }

  let qrCodeUrl;

  // Upload base64 qrcode to firebase storage
  try {
    const QRBuffer = Buffer.from(qrCode.split(",")[1], "base64");
    const QRFileNameWithPath = `users/${uid}/qrcode.png`;

    const file = storage.bucket().file(QRFileNameWithPath);
    await file.save(QRBuffer, {
      predefinedAcl: "publicRead",
      metadata: {
        contentType: "image/png",
      },
    });

    // Can be done by both ways, not sure which will be best.
    // const metaData = await file.getMetadata();
    // qrCodeUrl = metaData[0].mediaLink;

    qrCodeUrl = await storage.bucket().file(`users/${uid}/qrcode.png`).getSignedUrl({
      action: "read",
      expires: "01-01-2050",
    });
  } catch (error: any) {
    return res.status(500).json({
      message: "Unable to upload qrcode.",
    });
  }

  // Update user data
  const user = await User.findOneAndUpdate(
    { uid },
    {
      college,
      phoneNumber,
      graduationYear,
      course,
      dob,
      gender,
      address,
      state,
      pinCode,
      updatedAt: new Date(),
      qrCodeUrl: qrCodeUrl[0],
    },
    { new: true },
  );

  if (!user) {
    return res.status(500).json({
      message: "Unable to update user data",
    });
  }

  return res.status(200).json({
    message: "User data updated successfully",
  });
});

export default router;
