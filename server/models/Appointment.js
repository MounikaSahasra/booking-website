const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  name: {
    type: String, // ✅ User's name
    required: true,
  },
  reason: {
    type: String, // ✅ Reason for appointment
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },
});

module.exports = mongoose.model('Appointment', appointmentSchema);
