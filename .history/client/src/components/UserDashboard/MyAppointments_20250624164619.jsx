import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import "./userDashboard.css";

function MyAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      }
    });
    return () => unsubscribe();
  }, []);

 useEffect(() => {
  if (userId) {
    axios
      .get(`https://booking-backend.onrender.com/api/appointments/user/${userId}`)
      .then((res) => setAppointments(res.data))
      .catch((err) => console.error("Error fetching appointments:", err));
  }
}, [userId]);


  return (
    <div className="dashboard-wrapper">
      <Sidebar />
      <div className="user-dashboard-content">
        <h2>📋 My Appointments</h2>

        {appointments.length === 0 ? (
          <p className="empty-msg">No appointments found.</p>
        ) : (
          <div className="appointments-list">
            {appointments.map((appt, idx) => (
              <div
                key={idx}
                className={`appointment-card status-${appt.status}`}
              >
                <p><strong>Date:</strong> {new Date(appt.date).toLocaleDateString()}</p>
                <p><strong>Time:</strong> {appt.time}</p>
                <p><strong>Reason:</strong> {appt.reason}</p>
                <p><strong>Status:</strong>{" "}
                  <span className={`status-text ${appt.status}`}>
                    {appt.status.charAt(0).toUpperCase() + appt.status.slice(1)}
                  </span>
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyAppointments;
