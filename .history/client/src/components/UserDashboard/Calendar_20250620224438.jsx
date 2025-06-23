import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./userDashboard.css";
import axios from "axios";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function UserOverview() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [userId, setUserId] = useState(null);
  const [formData, setFormData] = useState({ name: "", reason: "", time: "" });
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);

  const timeSlots = {
    morning: ["09:00 AM", "10:00 AM", "11:00 AM"],
    afternoon: ["02:00 PM", "03:00 PM", "04:00 PM"],
  };

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUserId(user ? user.uid : null);
    });
    return () => unsubscribe();
  }, []);

  const handleBookNow = async () => {
    if (!formData.name || !formData.reason || !formData.time || !selectedDate) {
      alert("Please fill out all fields.");
      return;
    }

    if (!userId) {
      alert("⚠️ Please login to book an appointment.");
      return;
    }

    const appointmentData = {
      userId,
      name: formData.name,
      reason: formData.reason,
      time: formData.time,
      date: selectedDate,
      status: "pending",
    };

    try {
      await axios.post("http://localhost:5000/api/appointments", appointmentData);
      alert("✅ Appointment booked successfully!");
      setFormData({ name: "", reason: "", time: "" });
      setUpcomingAppointments([
        ...upcomingAppointments,
        {
          date: selectedDate.toISOString().split("T")[0],
          time: formData.time,
          reason: formData.reason,
        },
      ]);
    } catch (error) {
      console.error("Booking failed:", error);
      alert("❌ Could not book appointment");
    }
  };

  return (
    <main className="user-dashboard-content">
      <div className="user-main-area">
        {/* Welcome Section */}
        <section className="welcome-banner">
          <h2>Welcome back, Mounika 👋</h2>
          <p>Ready to book your next appointment?</p>
        </section>

        {/* Booking Form */}
        <section className="booking-card">
          <h3>📅 Book an Appointment</h3>

          <input
            type="text"
            placeholder="Your Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <textarea
            placeholder="Reason for appointment"
            value={formData.reason}
            onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
          />

          <div className="calendar-slots-container">
            <div className="calendar-wrapper">
              <label>Select a Date</label>
              <Calendar onChange={setSelectedDate} value={selectedDate} />
            </div>

            <div className="slots-wrapper">
              <div className="timeslot-group">
                <h4>Morning</h4>
                <div className="slot-row">
                  {timeSlots.morning.map((slot) => (
                    <button
                      key={slot}
                      className={formData.time === slot ? "selected" : ""}
                      onClick={() => setFormData({ ...formData, time: slot })}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              <div className="timeslot-group">
                <h4>Afternoon</h4>
                <div className="slot-row">
                  {timeSlots.afternoon.map((slot) => (
                    <button
                      key={slot}
                      className={formData.time === slot ? "selected" : ""}
                      onClick={() => setFormData({ ...formData, time: slot })}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <button className="book-btn" onClick={handleBookNow}>
            Book Now
          </button>
        </section>

        {/* Appointments */}
        <section className="upcoming-appointments">
          <h3>📌 Upcoming Appointments</h3>
          {upcomingAppointments.length === 0 ? (
            <p className="empty-msg">No upcoming appointments.</p>
          ) : (
            <div className="appointments-list">
              {upcomingAppointments.map((appt, idx) => (
                <div key={idx} className="appointment-card">
                  <p><strong>Date:</strong> {appt.date}</p>
                  <p><strong>Time:</strong> {appt.time}</p>
                  <p><strong>Reason:</strong> {appt.reason}</p>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

export default UserOverview;
