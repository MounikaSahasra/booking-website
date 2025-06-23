import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./adminDashboard.css";
import axios from "axios";

// Format to yyyy-mm-dd
const formatDate = (date) => new Date(date).toISOString().split("T")[0];

function CalendarView() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [appointments, setAppointments] = useState([]);
  const [markedDates, setMarkedDates] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/appointments")
      .then((res) => {
        setAppointments(res.data);
        const dates = res.data.map((appt) => formatDate(appt.date));
        setMarkedDates(dates);
      })
      .catch((err) => {
        console.error("Error fetching appointments:", err);
      });
  }, []);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const selectedAppointments = appointments.filter(
    (appt) => formatDate(appt.date) === formatDate(selectedDate)
  );

  return (
    <div className="calendar-view-wrapper d-flex flex-wrap justify-content-between">
      {/* Calendar Section */}
      <div className="calendar-container mb-4">
        <h2 className="mb-3">📅 Calendar Overview</h2>
        <Calendar
          onChange={handleDateChange}
          value={selectedDate}
          tileClassName={({ date }) =>
            markedDates.includes(formatDate(date)) ? "highlight-booked" : null
          }
        />
      </div>

      {/* Appointment Details Section */}
      <div className="details-container">
        <div className="selected-date-box">
          <h5 className="mb-3">Appointments on {selectedDate.toLocaleDateString("en-US", {
            weekday: "short",
            year: "numeric",
            month: "short",
            day: "numeric",
          })}</h5>

          {selectedAppointments.length > 0 ? (
            <ul className="appointment-list">
              {selectedAppointments.map((appt, index) => (
                <li key={index} className="appointment-item mb-3 p-2">
                  <div><strong>{appt.time}</strong> – {appt.name}</div>
                  <div><em>Reason:</em> {appt.reason}</div>
                  <div className={`status-label ${appt.status}`}>
                    Status: {appt.status}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="no-appointments text-muted">No appointments on this date.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default CalendarView;
