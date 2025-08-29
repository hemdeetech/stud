
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";

const firebaseConfig = {
  apiKey: "AIzaSyDFSMKNCije34uXLMxFnEx00tbTwY08MWI",
  authDomain: "hdtc-solution.firebaseapp.com",
  projectId: "hdtc-solution",
  storageBucket: "hdtc-solution.appspot.com",
  messagingSenderId: "1070343300608",
  appId: "1:1070343300608:web:0ca044f6cbe9065f98dae5",
  measurementId: "G-PHYSKTE6Y4"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize App Check
if (typeof window !== 'undefined') {
  // Pass your reCAPTCHA v3 site key (public key) to the provider.
  // This key is safe to be exposed in client-side code.
  initializeAppCheck(app, {
    provider: new ReCaptchaV3Provider('6Ld-5QsqAAAAAN_p093fl_4t2aJ3F8x3v5E2M-C8'),
    isTokenAutoRefreshEnabled: true
  });
}

const db = getFirestore(app);

export { app, db };
