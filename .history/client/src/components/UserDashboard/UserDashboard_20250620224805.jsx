import React from "react";
import Sidebar from "./Sidebar";
import UserOverview from "./Calendar";
import "./userDashboard.css"; // Must include the wrapper styles

function Dashboard() {
  return (
    <div className="user-dashboard-wrapper">
      <Sidebar />
      <UserOverview />
    </div>
  );
}

export default Dashboard;
