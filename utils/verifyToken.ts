import { auth } from "@firebase";
import { DecodedIdToken } from "firebase-admin/auth";

export async function verifyToken(token: string): Promise<DecodedIdToken> {
  try {
    return await auth.verifyIdToken(token, true);
  } catch (error: any) {
    throw new Error(error.message.split(".")[0]);
  }
}
