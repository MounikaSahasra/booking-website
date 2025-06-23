import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import axios from "axios";
import { PieChart, Pie, Cell, Legend } from "recharts";
import "react-calendar/dist/Calendar.css";
import "./adminDashboard.css";

const formatDate = (date) => new Date(date).toISOString().split("T")[0];

function AdminDashboard() {
  const [appointments, setAppointments] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/appointments")
      .then((res) => setAppointments(res.data))
      .catch((err) => console.error(err));
  }, []);

  const stats = {
    total: appointments.length,
    approved: appointments.filter((a) => a.status === "approved").length,
    pending: appointments.filter((a) => a.status === "pending").length,
    rejected: appointments.filter((a) => a.status === "rejected").length,
  };

  const pieData = [
    { name: "Approved", value: stats.approved, color: "#00ff9d" },
    { name: "Pending", value: stats.pending, color: "#ffc107" },
    { name: "Rejected", value: stats.rejected, color: "#ff4c4c" },
  ];

  const markedDates = appointments.map((a) => formatDate(a.date));

  const selectedAppointments = appointments.filter(
    (appt) => formatDate(appt.date) === formatDate(selectedDate)
  );

  return (
    <div className="admin-dashboard-layout">
      
      <h2 className="welcome-title">👋 Welcome, Admin</h2>

      {/* Pie Chart + Summary Cards */}
      <div className="top-section">
        <div className="pie-chart-container">
          <h3>Status Overview</h3>
          <PieChart width={300} height={300}>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              isAnimationActive={false}
              label
            >
              {pieData.map((entry, index) => (
                <Cell key={index} fill={entry.color} />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </div>

        <div className="summary-cards">
          <div className="stat-card total">Total: {stats.total}</div>
          <div className="stat-card approved">Approved: {stats.approved}</div>
          <div className="stat-card pending">Pending: {stats.pending}</div>
          <div className="stat-card rejected">Rejected: {stats.rejected}</div>
        </div>
      </div>

      {/* Calendar + Appointments */}
      <div className="calendar-appointments-section">
        <div className="calendar-box">
          <h3>📅 Calendar</h3>
          <Calendar
            onChange={setSelectedDate}
            value={selectedDate}
            tileClassName={({ date }) =>
              markedDates.includes(formatDate(date)) ? "highlight-booked" : null
            }
          />
        </div>

        <div className="appointment-details-box">
          <h3>Appointments on {selectedDate.toDateString()}</h3>
          {selectedAppointments.length > 0 ? (
            <ul className="appointment-list">
              {selectedAppointments.map((appt, index) => (
                <li key={index} className="appointment-card">
                  <div><strong>Name:</strong> {appt.name}</div>
                  <div><strong>Time:</strong> {appt.time}</div>
                  <div><strong>Reason:</strong> {appt.reason}</div>
                  <div className={`status-label ${appt.status}`}>
                    Status: {appt.status}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="no-appointments">No appointments on this date.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
