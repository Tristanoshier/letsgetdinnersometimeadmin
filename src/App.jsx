import React, { useContext } from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { AuthContext } from "./context/AuthContext";

import { Login } from "./components/auth/Login";
import { Register } from "./components/auth/Register";
import { Home } from "./components/pages/home/Home";
import { Profile } from "./components/pages/profile/Profile";
import { AddJob } from "./components/pages/home/Jobs/AddJob";

import "react-toastify/dist/ReactToastify.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./styles/App.scss";
import { EditJob } from "./components/pages/home/Jobs/EditJob";

function App() {
  const { currentUser } = useContext(AuthContext);

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  };

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/">
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              index
              element={
                <RequireAuth>
                  <Home />
                </RequireAuth>
              }
            />
            <Route path="/jobs">
              <Route
                path="add"
                element={
                  <RequireAuth>
                    <AddJob title="Add New Job" />
                  </RequireAuth>
                }
              />
              <Route
                path="edit"
                element={
                  <RequireAuth>
                    <EditJob title="Edit Job" />
                  </RequireAuth>
                }
              />
            </Route>
            <Route
              path="/profile"
              element={
                <RequireAuth>
                  <Profile />
                </RequireAuth>
              }
            />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
