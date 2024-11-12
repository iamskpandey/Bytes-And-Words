import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import Spinner from "./common/Spinner";
import { getDocs, collection, query, where } from "firebase/firestore";

function Protected({ children }) {
  const [user, loading] = useAuthState(auth);
  const [isAdmin, setIsAdmin] = useState(null);

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (user) {
        const adminsRef = collection(db, "admins");
        const q = query(adminsRef, where("email", "==", user.email));
        const querySnapshot = await getDocs(q);

        setIsAdmin(!querySnapshot.empty);
      }
    };

    if (user) {
      checkAdminStatus();
    } else if (!loading) {
      setIsAdmin(false); 
    }
  }, [user, loading]);

  if (loading || isAdmin === null) {
    return <Spinner />;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (!isAdmin) {
    return <Navigate to="/" />; 
  }

  return children;
}

export default Protected;
