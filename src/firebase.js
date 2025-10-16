// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCEmFKqRrk1JOqS2XsV5mVQYbuCrbwVkbk",
  authDomain: "biyahele-airbnb.firebaseapp.com",
  projectId: "biyahele-airbnb",
  storageBucket: "biyahele-airbnb.firebasestorage.app",
  messagingSenderId: "30868416937",
  appId: "1:30868416937:web:519b9143a132aa26e07cb8",
  measurementId: "G-9ETZ1VHC6S"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
