// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLI_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLI_FIREBASE_AUTH_DOMAIN_KEY,
  projectId: process.env.NEXT_PUBLI_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLI_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLI_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLI_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const firestore = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { app, firestore, auth, storage };
