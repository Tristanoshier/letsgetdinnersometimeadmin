import React from "react";
import { Link } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { Logout } from "../auth/Logout";

export const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="top">
        <div classname="logo">let's get dinner sometime</div>
      </div>
      <div className="center">
        <ul>
          <Link to="/" style={{ textDecoration: "none" }}>
            <li>
              <DashboardIcon className="icon" />
              <span>Home</span>
            </li>
          </Link>
        </ul>
      </div>
      <div className="bottom">
        <Logout />
      </div>
    </div>
  );
};
