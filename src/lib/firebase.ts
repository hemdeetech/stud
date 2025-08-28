import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

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
const db = getFirestore(app);

export { app, db };
