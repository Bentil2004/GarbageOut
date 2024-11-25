import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCuGALr3jPI-ZvWmvIPLWHxtbvNzkgIe_o",
  authDomain: "garbageout-6d502.firebaseapp.com",
  projectId: "garbageout-6d502",
  storageBucket: "garbageout-6d502.firebasestorage.app",
  messagingSenderId: "698930577785",
  appId: "1:698930577785:web:dfb376d591089991122fa8",
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_FIRESTORE = getFirestore(FIREBASE_APP);
export const FIREBASE_STORAGE = getStorage(FIREBASE_APP);
