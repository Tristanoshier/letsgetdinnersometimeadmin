import React from "react";
import { Sidebar } from "../../shared/Sidebar"
import { JobDashboard } from "./Jobs/JobDashboard";

export const Home = () => {
  return (
    <div className="home">
    <Sidebar />
    <div className="homeContainer">
      <div className="listContainer">
        <JobDashboard />
      </div>
    </div>
  </div>
  );
};
