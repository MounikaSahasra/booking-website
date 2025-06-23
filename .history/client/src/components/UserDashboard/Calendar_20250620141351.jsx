 import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./userDashboard.css";
import axios from "axios";

function UserOverview() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const timeSlots = {
    morning: ["09:00 AM", "10:00 AM", "11:00 AM"],
    afternoon: ["02:00 PM", "03:00 PM", "04:00 PM"],
  };

  const [formData, setFormData] = useState({
    name: "",
    reason: "",
    time: "",
  });

  const [upcomingAppointments, setUpcomingAppointments] = useState([
    {
      date: "2025-06-22",
      time: "10:00 AM",
      reason: "Project Review Meeting",
    },
    {
      date: "2025-06-24",
      time: "03:00 PM",
      reason: "Academic Counseling",
    },
  ]);

  const handleBookNow = async () => {
    const appointmentData = {
      name: formData.name,
      reason: formData.reason,
      time: formData.time,
      date: selectedDate,
      status: "pending",
    };

    if (!formData.name || !formData.reason || !formData.time || !selectedDate) {
      alert("Please fill out all fields.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/appointments", appointmentData);
      alert("✅ Appointment booked successfully!");
      
      // Optionally clear form
      setFormData({ name: "", reason: "", time: "" });

      // Optionally update upcomingAppointments
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
    <div className="user-main-area">
      <section className="welcome-banner">
        <h2>Welcome back, Mounika 👋</h2>
        <p>Ready to book your next appointment?</p>
      </section>

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

        <div className="calendar-and-slots">
          <div className="calendar-wrapper">
            <label>Select a Date</label>
            <Calendar onChange={setSelectedDate} value={selectedDate} />
          </div>

          <div className="timeslots">
            <div>
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

            <div>
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
  );
}

export default UserOverview;
