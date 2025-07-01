import { getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase configuration with environment variable fallbacks
const firebaseConfig = {
  apiKey:
    process.env.NEXT_PUBLIC_FIREBASE_API_KEY ||
    "AIzaSyCZR7qSS_dTN3eNHXIRoDHAG1TB_GcjwqI",
  authDomain:
    process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ||
    "fieldporter-website.firebaseapp.com",
  projectId:
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "fieldporter-website",
  storageBucket:
    process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ||
    "fieldporter-website.firebasestorage.app",
  messagingSenderId:
    process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "412133715476",
  appId:
    process.env.NEXT_PUBLIC_FIREBASE_APP_ID ||
    "1:412133715476:web:924be61903196cfbe50101",
  measurementId:
    process.env["NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID"] || "G-4YGGNZYQ1J",
};

// Initialize Firebase only if it hasn't been initialized already
const app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]!;

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
