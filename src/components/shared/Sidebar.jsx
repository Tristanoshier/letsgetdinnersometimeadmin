import React from "react";
import { Link } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Logout } from "../auth/Logout";

export const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="top"></div>
      <div className="center">
        <Link to="/" style={{ textDecoration: "none" }}>
          <li>
            <DashboardIcon className="icon" />
            <span>Home</span>
          </li>
        </Link>
        <Link to="/profile" style={{ textDecoration: "none" }}>
          <li>
            <AccountCircleOutlinedIcon className="icon" />
            <span>Profile</span>
          </li>
        </Link>

        <li>
          <Logout />
        </li>
      </div>
    </div>
  );
};
