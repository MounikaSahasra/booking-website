import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import UserOverview from "./Calendar"; // Adjust path if needed

const UserDashboard = () => {
  return (
    <div className="user-dashboard-wrapper">
     
      <div className="user-dashboard-content">
        <Outlet />
      </div>
    </div>
  );
};

export default UserDashboard;
