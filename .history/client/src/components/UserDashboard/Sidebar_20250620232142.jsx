import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaHome, FaListAlt, FaSignOutAlt } from "react-icons/fa";
import "./userDashboard.css"; // Same as adminDashboard.css pattern

function Sidebar() {
  const location = useLocation();

  return (
    <div className="admin-sidebar">
      <h2 className="sidebar-title">User Panel</h2>
      <ul className="sidebar-links">
        <li>
          <Link to="/dashboard" className={location.pathname === "/dashboard" ? "active" : ""}>
            <FaHome className="sidebar-icon" /> Overview
          </Link>
        </li>
        <li>
          <Link to="/appointments" className={location.pathname === "/appointments" ? "active" : ""}>
            <FaListAlt className="sidebar-icon" /> My Appointments
          </Link>
        </li>
      </ul>

      <div className="logout-section">
        <Link to="/logout" className="logout-link">
          <FaSignOutAlt className="sidebar-icon" /> Logout
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;
