import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaHome, FaCalendarAlt, FaListAlt, FaSignOutAlt } from "react-icons/fa";
import "./userDashboard.css";

function Sidebar() {
  const location = useLocation();

  return (
    <div className="admin-sidebar">
      <div>
        <h2>Dashboard</h2>
        <nav className="sidebar-nav">
          <Link to="/dashboard" className={location.pathname === "/dashboard" ? "active" : ""}>
            <FaHome className="sidebar-icon" /> Overview
          </Link>
          <Link to="/appointments" className={location.pathname === "/appointments" ? "active" : ""}>
            <FaListAlt className="sidebar-icon" /> My Appointments
          </Link>
        </nav>
      </div>
      <div className="logout-section">
        <Link to="/logout">
          <FaSignOutAlt className="sidebar-icon" /> Logout
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;
