// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
// Validate environment variables
const {
  VITE_FIREBASE_API_KEY,
  VITE_FIREBASE_AUTH_DOMAIN,
  VITE_FIREBASE_PROJECT_ID,
  VITE_FIREBASE_STORAGE_BUCKET,
  VITE_FIREBASE_MESSAGING_SENDER_ID,
  VITE_FIREBASE_APP_ID,
} = import.meta.env;

if (
  !VITE_FIREBASE_API_KEY ||
  !VITE_FIREBASE_AUTH_DOMAIN ||
  !VITE_FIREBASE_PROJECT_ID ||
  !VITE_FIREBASE_STORAGE_BUCKET ||
  !VITE_FIREBASE_MESSAGING_SENDER_ID ||
  !VITE_FIREBASE_APP_ID
) {
  console.log("Missing Firebase environment variables");
  throw new Error("Missing Firebase environment variables");
}

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: VITE_FIREBASE_API_KEY,
  authDomain: VITE_FIREBASE_AUTH_DOMAIN,
  projectId: VITE_FIREBASE_PROJECT_ID,
  storageBucket: VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: VITE_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Set Firebase Auth persistence to LOCAL
setPersistence(getAuth(app), browserLocalPersistence);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;
