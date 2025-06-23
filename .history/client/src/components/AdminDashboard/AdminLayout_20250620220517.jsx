import React from "react";
import AdminSidebar from "./AdminSidebar";
import { Outlet } from "react-router-dom";
import "./adminSidebar.css"; // if not already imported

function AdminLayout() {
  return (
    <div className="admin-dashboard-layout">
      <AdminSidebar />
      <div className="admin-content">
        <Outlet />
      </div>
    </div>
  );
}

export default AdminLayout;
