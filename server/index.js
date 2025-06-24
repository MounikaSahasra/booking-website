const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
const app = express();
connectDB();

// ✅ CORS Middleware
const corsOptions = {
  origin: "https://appointment-booking-syst-ad120.web.app",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // ✅ Handles preflight requests

app.use(express.json());

// ✅ Route Mounting Order (AFTER middleware)
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/appointments', require('./routes/appointmentRoutes'));

app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
