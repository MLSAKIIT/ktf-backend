import { initializeApp, cert } from "firebase-admin/app";
import { getApps } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getStorage } from "firebase-admin/storage";

const ktfBaseAppConfig = {
  credential: cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY
      ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n")
      : undefined,
  }),
  storageBucket: `${process.env.FIREBASE_PROJECT_ID}.appspot.com`,
};

const ktfAdminAppConfig = {
  credential: cert({
    projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
    clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY
      ? process.env.FIREBASE_ADMIN_PRIVATE_KEY.replace(/\\n/g, "\n")
      : undefined,
  }),
  storageBucket: `${process.env.FIREBASE_ADMIN_PROJECT_ID}.appspot.com`,
};

if (!getApps()[0]?.name) {
  initializeApp(ktfBaseAppConfig);
  console.log(`[${new Date().toUTCString()}] Initialized Firebase base app`);
}

let ktfAdminApp;
if (!ktfAdminApp) {
  ktfAdminApp = initializeApp(ktfAdminAppConfig, "admin");
  console.log(`[${new Date().toUTCString()}] Initialized Firebase Admin app`);
}

const auth = getAuth();
const storage = getStorage();
const adminAuth = getAuth(ktfAdminApp);

export { auth, storage, adminAuth };
