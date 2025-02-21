import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth, db } from "../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const docRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserRole(docSnap.data().role);
        } else {
          console.error("User role not found in Firestore.");
        }
      } else {
        setUser(null);
        setUserRole(null);
      }
      setLoading(false);
    });

    return () => unsubscribe(); // Cleanup function
  }, []);

  if (loading) return <p>Loading...</p>;

  return user && allowedRoles.includes(userRole) ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
