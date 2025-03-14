import React, { useEffect, useState } from "react";
import { auth, db } from "../../../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { Sidebar } from "../../shared/Sidebar";

export const Profile = () => {
  const [userDetails, setUserDetails] = useState(null);

  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      const docRef = doc(db, "Users", user.uid);

      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserDetails(docSnap.data());
      }
    });
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <div className="listContainer">
          {userDetails ? (
            <>
              <div style={{ display: "flex", justifyContent: "center" }}></div>
              <h3>Welcome {userDetails.firstName}</h3>
              <div>
                <p>Email: {userDetails.email}</p>
                <p>First Name: {userDetails.firstName}</p>
                <p>Last Name: {userDetails.lastName}</p>
                <p>Phone Number: {userDetails.phoneNumber}</p>
              </div>
            </>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
};
