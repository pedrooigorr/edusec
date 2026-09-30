import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDcyDzr-C2D-zuSDFyGcwNbNQnKGHWsuOw",
  authDomain: "eduguard-d91ee.firebaseapp.com",
  projectId: "eduguard-d91ee",
  storageBucket: "eduguard-d91ee.firebasestorage.app",
  messagingSenderId: "444057067621",
  appId: "1:444057067621:web:e5399f01f01d68bde3a68c"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);