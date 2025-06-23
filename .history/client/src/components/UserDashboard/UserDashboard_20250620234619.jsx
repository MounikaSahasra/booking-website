import React from "react";
import Sidebar from "./Sidebar";
import UserOverview from "./Calendar";
import "./userDashboard.css";

function Dashboard() {
  return (
    <div className="dashboard-wrapper">
      <Sidebar />
      <UserOverview />
      <Outlet />
    </div>
  );
}

export default Dashboard;
