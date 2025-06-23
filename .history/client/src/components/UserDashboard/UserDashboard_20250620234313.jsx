import React from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import "./userDashboard.css";

function UserDashboard() {
  return (
    <div className="user-dashboard-layout">
      <Sidebar />
      <div className="user-dashboard-content">
        <Outlet /> {/* 👈 THIS RENDERS nested routes */}
      </div>
    </div>
  );
}

export default UserDashboard;
