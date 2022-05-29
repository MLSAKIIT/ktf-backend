import { initializeApp, cert } from "firebase-admin/app";
import { getApps } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getStorage } from "firebase-admin/storage";

const firebaseAdminConfig = {
  credential: cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY
      ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n")
      : undefined,
  }),
  storageBucket: `${process.env.FIREBASE_PROJECT_ID}.appspot.com`,
};

if (!getApps().length) {
  initializeApp(firebaseAdminConfig);
}
const auth = getAuth();
const storage = getStorage();

export { auth, storage };
