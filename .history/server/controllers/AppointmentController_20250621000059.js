const Appointment = require('../models/Appointment');

// POST: Book an appointment
const bookAppointment = async (req, res) => {
  try {
    const appointment = new Appointment(req.body);
    await appointment.save();
    res.status(201).json(appointment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// ✅ GET: All appointments (admin view)
const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({ date: -1 });
    res.status(200).json(appointments);
  } catch (err) {
    res.status(500).json({ error: "Error fetching appointments" });
  }
};

// GET: Upcoming appointments for a user
const getUpcomingAppointments = async (req, res) => {
  try {
    const { userId } = req.params;
    const today = new Date();
    const appointments = await Appointment.find({
      userId,
      date: { $gte: today }
    }).sort({ date: 1 });
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: "Error fetching upcoming appointments" });
  }
};

// GET: Booked time slots for a date
const getBookedSlots = async (req, res) => {
  try {
    const { date } = req.params;
    const slots = await Appointment.find({ date: new Date(date) });
    res.json(slots);
  } catch (err) {
    res.status(500).json({ error: "Error fetching booked slots" });
  }
};

const getAppointmentsByUserId = async (req, res) => {
  const { userId } = req.params;
  try {
    const appointments = await Appointment.find({ userId });
    res.status(200).json(appointments);
  } catch (error) {
    console.error("Error fetching appointments for user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// PATCH: Update status of an appointment
const updateAppointmentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const appointment = await Appointment.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!appointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }

    res.json(appointment);
  } catch (err) {
    res.status(500).json({ error: "Error updating appointment status" });
  }
};

// ✅ GET: Check if user already booked on date
const checkUserBookings = async (req, res) => {
  try {
    const { userId, date } = req.query;

    const existing = await Appointment.findOne({
      userId,
      date: new Date(date).toISOString().split('T')[0], // Ensure date-only
    });

    res.status(200).json({ alreadyBooked: !!existing });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  bookAppointment,
  getAllAppointments,
  getUpcomingAppointments,
  getBookedSlots,
  updateAppointmentStatus,
  checkUserBookings,
  getAppointmentsByUserId
};
