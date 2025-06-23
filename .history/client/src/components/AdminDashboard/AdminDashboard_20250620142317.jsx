import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import "react-calendar/dist/Calendar.css";
import "./adminDashboard.css";

// Chart.js setup
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

// Helper to format date to YYYY-MM-DD
const formatDate = (date) => new Date(date).toISOString().split("T")[0];

function AdminDashboard() {
  const [appointments, setAppointments] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/appointments");
        setAppointments(res.data);
      } catch (err) {
        console.error("Error fetching appointments:", err);
      }
    };

    fetchAppointments();
  }, []);

  // Compute appointment statistics
  const stats = {
    total: appointments.length,
    approved: appointments.filter((a) => a.status === "approved").length,
    pending: appointments.filter((a) => a.status === "pending").length,
    rejected: appointments.filter((a) => a.status === "rejected").length
  };

  const markedDates = appointments.map((a) => formatDate(a.date));
  const selectedAppointments = appointments.filter(
    (appt) => formatDate(appt.date) === formatDate(selectedDate)
  );

  // Pie chart data
  const pieData = {
    labels: ["Approved", "Pending", "Rejected"],
    datasets: [
      {
        data: [stats.approved, stats.pending, stats.rejected],
        backgroundColor: ["#00ff9d", "#ffc107", "#ff4c4c"],
        borderWidth: 1
      }
    ]
  };

  return (
    <div className="admin-dashboard">
      <h2 className="welcome-section">👋 Welcome, Admin</h2>

      {/* Summary cards + Pie chart */}
      <div className="summary-pie-container">
        <div className="summary-cards">
          <div className="stat-card total">Total: {stats.total}</div>
          <div className="stat-card approved">Approved: {stats.approved}</div>
          <div className="stat-card pending">Pending: {stats.pending}</div>
          <div className="stat-card rejected">Rejected: {stats.rejected}</div>
        </div>

        <div className="pie-chart-card">
          <Pie data={pieData} />
        </div>
      </div>

      {/* Calendar + appointments */}
      <div className="calendar-appointments">
        <div className="calendar-container">
          <h3>📅 Calendar View</h3>
          <Calendar
            onChange={setSelectedDate}
            value={selectedDate}
            tileClassName={({ date }) =>
              markedDates.includes(formatDate(date)) ? "highlight-booked" : null
            }
          />
        </div>

        <div className="appointment-details">
          <h3>Appointments on {selectedDate.toDateString()}</h3>
          {selectedAppointments.length > 0 ? (
            <ul className="appointment-list">
              {selectedAppointments.map((appt, index) => (
                <li key={index} className="appointment-card">
                  <div><strong>Time:</strong> {appt.time}</div>
                  <div><strong>Name:</strong> {appt.name}</div>
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
