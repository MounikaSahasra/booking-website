import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./adminDashboard.css";

const mockAppointments = [
  { date: new Date(), time: "10:00 AM", name: "John Doe", reason: "Consultation", status: "approved" },
  { date: new Date(), time: "11:30 AM", name: "Jane Smith", reason: "Follow-up", status: "pending" },
];

function AdminDashboard() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const filteredAppointments = mockAppointments.filter(
    (appt) => appt.date.toDateString() === selectedDate.toDateString()
  );

  return (
    <div className="admin-dashboard-content">
      <h2 className="welcome-text">Welcome, Admin</h2>

      {/* Summary Cards */}
      <div className="summary-cards">
        <div className="card stat-card">Total Appointments: 15</div>
        <div className="card stat-card">Approved: 8</div>
        <div className="card stat-card">Pending: 5</div>
        <div className="card stat-card">Rejected: 2</div>
      </div>

      {/* Pie Chart Mock */}
      <div className="chart-section">
        <div className="chart-placeholder">
          <p>Pie Chart Placeholder</p>
        </div>
      </div>

      {/* Calendar + Appointment Details */}
      <div className="calendar-details-section">
        <div className="calendar-box">
          <h3>📅 Calendar View</h3>
          <Calendar
            onChange={setSelectedDate}
            value={selectedDate}
            tileClassName={({ date }) =>
              mockAppointments.some((appt) => appt.date.toDateString() === date.toDateString())
                ? "highlight-booked"
                : null
            }
          />
        </div>

        <div className="details-box">
          <h4>Appointments on {selectedDate.toDateString()}</h4>
          {filteredAppointments.length > 0 ? (
            filteredAppointments.map((appt, idx) => (
              <div key={idx} className="appointment-item">
                <strong>{appt.time}</strong> – {appt.name}
                <p><em>Reason:</em> {appt.reason}</p>
                <p className={`status ${appt.status}`}>Status: {appt.status}</p>
              </div>
            ))
          ) : (
            <p className="no-appointments">No appointments scheduled.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
