import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDThVfUseiXk-hCeSvbTG2qciJjR-H4_4M",
    authDomain: "student-review-system-108d6.firebaseapp.com",
    projectId: "student-review-system-108d6",
    storageBucket: "student-review-system-108d6.firebasestorage.app",
    messagingSenderId: "891830042219",
    appId: "1:891830042219:web:383bbefceee096474e7b2e",
    measurementId: "G-40C654SSHS"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };    
