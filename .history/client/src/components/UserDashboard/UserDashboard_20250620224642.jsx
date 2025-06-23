import React from "react";
import Sidebar from "./Sidebar"; // Your existing sidebar
import UserOverview from "./Calendar"; // This file

import "./userDashboard.css"; // Should contain the `.user-dashboard-wrapper` styling

function DashboardPage() {
  return (
    <div className="user-dashboard-wrapper">
      <Sidebar />
      <UserOverview />
    </div>
  );
}

export default DashboardPage;
