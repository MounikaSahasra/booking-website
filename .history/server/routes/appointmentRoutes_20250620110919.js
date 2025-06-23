const express = require('express');
const router = express.Router();

const {
  bookAppointment,
  getAllAppointments,
  getUpcomingAppointments,
  getBookedSlots,
  updateAppointmentStatus,
  checkUserBooking // ✅ NEW: Check if user already booked on that date
} = require('../controllers/appointmentController');

// Routes
router.post('/', bookAppointment);
// router.post('/book', bookAppointment);
router.get('/upcoming/:userId', getUpcomingAppointments);
router.get('/booked-slots/:date', getBookedSlots);
router.patch('/:id/status', updateAppointmentStatus);
router.get('/user-booked/:userId/:date', checkUserBooking); // ✅ New route

module.exports = router;
