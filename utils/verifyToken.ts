import { auth, adminAuth } from "@firebase";
import { DecodedIdToken } from "firebase-admin/auth";

export async function verifyToken(token: string, admin: boolean = false): Promise<DecodedIdToken> {
  try {
    if (admin) return await adminAuth.verifyIdToken(token, true);
    return await auth.verifyIdToken(token, true);
  } catch (error: any) {
    throw new Error(error.message.split(".")[0]);
  }
}
