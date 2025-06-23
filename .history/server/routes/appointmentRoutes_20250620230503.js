const express = require('express');
const router = express.Router();

const {
  bookAppointment,
  getAllAppointments,
  getUpcomingAppointments,
  getBookedSlots,
  updateAppointmentStatus,
  checkUserBookings
} = require('../controllers/appointmentController');

// Routes
router.post('/', bookAppointment);                          // Create new appointment
router.get('/', getAllAppointments);                        // ✅ GET all appointments
router.get('/upcoming/:userId', getUpcomingAppointments);   // Get user's upcoming appointments
router.get('/booked-slots/:date', getBookedSlots);          // Get booked time slots for a date
router.patch('/:id/status', updateAppointmentStatus);       // Update status (approve/reject)
router.get('/user-booked/:userId/:date', checkUserBooking); // Check if user already booked

module.exports = router;
