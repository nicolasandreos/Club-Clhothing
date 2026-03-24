import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDxbFMqZmSjkDcHXIG0fkoBeQ9wXkYEIig",
  authDomain: "club-clothing-26be8.firebaseapp.com",
  projectId: "club-clothing-26be8",
  storageBucket: "club-clothing-26be8.firebasestorage.app",
  messagingSenderId: "653541242572",
  appId: "1:653541242572:web:5bb88ebcf970619e797469"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);