import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, getDocs, query, where } from "firebase/firestore"

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

const getSubjects = async (filters = {}) => {
  try {
    let q = collection(db, "subjects")

    if (filters.teacherId) {
      q = query(q, where("teacherId", "==", filters.teacherId))
    }
    if (filters.year) {
      q = query(q, where("year", "==", filters.year))
    }
    if (filters.course) {
      q = query(q, where("course", "==", filters.course))
    }

    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
  } catch (error) {
    console.error("Error getting subjects:", error)
    return []
  }
}

export { getSubjects }

export { auth, db, app };    
