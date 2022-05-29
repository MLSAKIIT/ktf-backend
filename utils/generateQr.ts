import QRCode from "qrcode";

export const generateQr = async (text: string) => {
  try {
    return await QRCode.toDataURL(text, {
      errorCorrectionLevel: "H",
      type: "image/png",
      margin: 1,
      width: 500,
    });
  } catch (err: any) {
    return new Error(err.message as string);
  }
};
