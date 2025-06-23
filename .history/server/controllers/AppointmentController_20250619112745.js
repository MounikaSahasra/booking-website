const Appointment = require('../models/Appointment');

// Book a new appointment
const bookAppointment = async (req, res) => {
  try {
    const { userId, name, reason, date, time } = req.body;

    const appointment = new Appointment({ userId, name, reason, date, time });
    await appointment.save();

    res.status(201).json({ message: 'Appointment booked successfully' });
  } catch (error) {
    console.error('Booking failed:', error);
    res.status(500).json({ message: 'Booking failed', error });
  }
};

// Get all appointments
const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.json(appointments);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ message: 'Error fetching appointments' });
  }
};

// Get upcoming approved appointments for a user
const getUpcomingAppointments = async (req, res) => {
  const { userId } = req.params;

  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const appointments = await Appointment.find({
      userId,
      status: 'approved',
      date: { $gte: today }
    });

    res.status(200).json(appointments);
  } catch (error) {
    console.error('Error fetching upcoming appointments:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update status (approve/reject) by admin
const updateAppointmentStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const updated = await Appointment.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.status(200).json(updated);
  } catch (error) {
    console.error("Failed to update appointment status:", error);
    res.status(500).json({ message: "Failed to update status", error });
  }
};

// Get all booked time slots for a specific date
const getBookedSlots = async (req, res) => {
  try {
    const { date } = req.params;

    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const appointments = await Appointment.find({
      date: { $gte: startOfDay, $lte: endOfDay }
    });

    const bookedSlots = appointments.map((a) => a.time);
    res.json(bookedSlots);
  } catch (error) {
    console.error('Error fetching booked slots:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// ✅ NEW: Check if user already has an appointment for a given date
const checkUserBooking = async (req, res) => {
  const { userId, date } = req.params;

  try {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const existing = await Appointment.findOne({
      userId,
      date: { $gte: startOfDay, $lte: endOfDay }
    });

    res.json({ alreadyBooked: !!existing });
  } catch (err) {
    console.error("Error checking user booking:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  bookAppointment,
  getAllAppointments,
  getUpcomingAppointments,
  getBookedSlots,
  updateAppointmentStatus,
  checkUserBooking // ✅ Export the new controller
};
