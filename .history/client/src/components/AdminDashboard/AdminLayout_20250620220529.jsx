import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import "./adminDashboard.css"; // Assuming you have some styles for the layout

function AdminLayout() {
  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      {/* Sticky Sidebar */}
      <AdminSidebar />

      {/* Scrollable Main Area */}
      <div style={{ flex: 1, overflowY: "auto" }}>
        <Outlet />
      </div>
    </div>
  );
}

export default AdminLayout;
