import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaCalendarAlt, FaListAlt, FaSignOutAlt } from "react-icons/fa";
import { Outlet } from 'react-router-dom';
import "./userDashboard.css"
import My


function Sidebar() {
  return (
    <div className="admin-sidebar">
      <div>
        <h2>Dashboard</h2>
        <nav className="sidebar-nav">
          <Link to="/dashboard"><FaHome className="sidebar-icon" /> Overview</Link>
          <Link to="/appointments"><FaListAlt className="sidebar-icon" /> My Appointments</Link>
          <Link to="/calendar"><FaCalendarAlt className="sidebar-icon" /> Calendar View</Link>
        </nav>
      </div>
      <div className="logout-section">
        <Link to="/logout"><FaSignOutAlt className="sidebar-icon" /> Logout</Link>
      </div>
    </div>
  );
}

export default Sidebar;
