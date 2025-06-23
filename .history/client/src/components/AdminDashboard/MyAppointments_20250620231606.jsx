import React, { useEffect, useState } from "react";
import axios from "axios";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import "./userDashboard.css";

function MyAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserId(user.uid);
        try {
          const res = await axios.get(`http://localhost:5000/api/appointments/upcoming/${user.uid}`);
          setAppointments(res.data);
        } catch (err) {
          console.error("Failed to fetch appointments", err);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="my-appointments">
      <h2>📋 My Appointments</h2>
      {appointments.length === 0 ? (
        <p className="empty-msg">No appointments found.</p>
      ) : (
        <div className="appointment-list">
          {appointments.map((appt, index) => (
            <div key={index} className="appointment-card">
              <p><strong>Date:</strong> {new Date(appt.date).toLocaleDateString()}</p>
              <p><strong>Time:</strong> {appt.time}</p>
              <p><strong>Reason:</strong> {appt.reason}</p>
              <span className={`status-badge ${appt.status}`}>{appt.status}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyAppointments;
