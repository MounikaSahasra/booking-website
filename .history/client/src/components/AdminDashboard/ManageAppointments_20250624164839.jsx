import React, { useEffect, useState } from "react";
import axios from "axios";
import "./adminDashboard.css";

function ManageAppointments() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const res = await axios.get("https://booking-backend.onrender.com/api/appointments");
      setAppointments(res.data);
    } catch (err) {
      console.error("Error fetching appointments:", err);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.patch(`http://localhost:5000/api/appointments/${id}/status`, { status });
      fetchAppointments(); // Refresh the list
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  return (
    <div className="manage-appointments">
      <h2>📋 Manage Appointments</h2>

      {appointments.length === 0 ? (
        <p>No appointments to manage.</p>
      ) : (
        <table className="appointment-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Reason</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appt) => (
              <tr key={appt._id}>
                <td>{appt.name}</td>
                <td>{appt.reason}</td>
                <td>{new Date(appt.date).toLocaleDateString()}</td>
                <td>{appt.time}</td>
                <td className={`status-${appt.status}`}>{appt.status}</td>
                <td>
                  <button
                    className="approve-btn"
                    disabled={appt.status === "approved"}
                    onClick={() => updateStatus(appt._id, "approved")}
                  >
                    Approve
                  </button>
                  <button
                    className="reject-btn"
                    disabled={appt.status === "rejected"}
                    onClick={() => updateStatus(appt._id, "rejected")}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ManageAppointments;
