import React, { useContext } from "react";
import { auth } from "../../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export const Logout = () => {
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);

  const handleLogout = () => {
    auth.signOut().then(() => {
      dispatch({ type: "LOGOUT", payload: null });
      navigate("/login");
    });
  };

  return <button onClick={handleLogout}>Logout</button>;
};
