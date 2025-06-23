import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaCalendarAlt, FaListAlt, FaSignOutAlt } from "react-icons/fa";
import { Outlet } from 'react-router-dom';
import "./userDashboard.css"
import MyAppointments from "./MyAppointments";
import { Link, useLocation } from "react-router-dom";


function Sidebar() {
  return (
    <div className="admin-sidebar">
      <div>
        <h2>Dashboard</h2>
        <nav className="sidebar-nav">
          <Link to="/dashboard"><FaHome className="sidebar-icon" /> Overview</Link>
          <Link to="/appointments"><FaListAlt className="sidebar-icon" /> My Appointments</Link>
        </nav>
      </div>
      <div className="logout-section">
        <Link to="/logout"><FaSignOutAlt className="sidebar-icon" /> Logout</Link>
      </div>
    </div>
  );
}

export default Sidebar;
