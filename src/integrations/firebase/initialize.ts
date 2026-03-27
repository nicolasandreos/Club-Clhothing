import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDxbFMqZmSjkDcHXIG0fkoBeQ9wXkYEIig",
  authDomain: "club-clothing-26be8.firebaseapp.com",
  projectId: "club-clothing-26be8",
  storageBucket: "club-clothing-26be8.firebasestorage.app",
  messagingSenderId: "653541242572",
  appId: "1:653541242572:web:5bb88ebcf970619e797469",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
