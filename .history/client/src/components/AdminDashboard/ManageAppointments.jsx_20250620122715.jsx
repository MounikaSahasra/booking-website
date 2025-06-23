import React, { useEffect, useState } from "react";
import axios from "axios";
import "./adminDashboard.css";

function Appointments() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/appointments");
      setAppointments(res.data);
    } catch (error) {
      console.error("Failed to fetch appointments:", error);
    }
  };

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await axios.patch(`http://localhost:5000/api/appointments/${id}/status`, {
        status: newStatus,
      });
      setAppointments((prev) =>
        prev.map((apt) =>
          apt._id === id ? { ...apt, status: newStatus } : apt
        )
      );
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  return (
    <div className="admin-appointments">
      <h2>All Appointments</h2>
      {appointments.length === 0 ? (
        <p>No appointments available.</p>
      ) : (
        <table className="table table-striped table-bordered mt-3">
          <thead className="table-dark">
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
            {appointments.map((apt) => (
              <tr key={apt._id}>
                <td>{apt.name || "N/A"}</td>
                <td>{apt.reason || "N/A"}</td>
                <td>{new Date(apt.date).toLocaleDateString("en-GB")}</td>
                <td>{apt.time}</td>
                <td>
                  <span
                    className={`badge ${
                      apt.status === "pending"
                        ? "bg-warning text-dark"
                        : apt.status === "approved"
                        ? "bg-success"
                        : "bg-danger"
                    }`}
                  >
                    {apt.status}
                  </span>
                </td>
                <td>
                  {apt.status === "pending" ? (
                    <>
                      <button
                        className="btn btn-sm btn-success me-2"
                        onClick={() => handleStatusUpdate(apt._id, "approved")}
                      >
                        Approve
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleStatusUpdate(apt._id, "rejected")}
                      >
                        Reject
                      </button>
                    </>
                  ) : (
                    <em>No action</em>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Appointments;
