import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { AuthContext } from "../../context/AuthContext";

export const Login = () => {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { dispatch } = useContext(AuthContext)

  const handleLogin = (e) => {
    e.preventDefault();
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          dispatch({type: "LOGIN", payload: user})
          navigate("/")
        })
        .catch((error) => {
          setError(true);
        })

  };
  return (
    <div className="login">
      <form onSubmit={handleLogin}>
        <h3>Login</h3>

        <label>Email address</label>
        <input
          type="email"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Login</button>

        <p>
          New user <a href="/register">Register Here</a>
        </p>

        {error && <span>Wrong email or password</span>}
      </form>
    </div>
  );
};
