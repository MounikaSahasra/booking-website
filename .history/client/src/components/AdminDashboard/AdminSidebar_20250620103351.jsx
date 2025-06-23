import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaChartPie, FaCalendarCheck, FaSignOutAlt } from "react-icons/fa";
import "./adminDashboard.css";

function AdminSidebar() {
  const location = useLocation();

  return (
    <div className="admin-sidebar">
      <h2 className="sidebar-title">Admin Panel</h2>
      <ul className="sidebar-links">
        <li>
          <Link to="/admin" className={location.pathname === "/admin" ? "active" : ""}>
            <FaChartPie /> Overview
          </Link>
        </li>
        <li>
          <Link to="/admin/appointments" className={location.pathname === "/admin/appointments" ? "active" : ""}>
            <FaCalendarCheck /> Manage Appointments
          </Link>
        </li>
      </ul>

      <div className="logout-section">
        <Link to="/" className="logout-link">
          <FaSignOutAlt /> Logout
        </Link>
      </div>
    </div>
  );
}

export default AdminSidebar;
