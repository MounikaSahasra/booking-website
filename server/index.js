const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
const app = express();
connectDB();

// ✅ Set correct CORS config with preflight support
const corsOptions = {
  origin: "https://appointment-booking-syst-ad120.web.app",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
};

// ✅ Middleware setup
app.use(cors(corsOptions));

// ✅ Handle preflight (OPTIONS) requests globally
app.options('*', cors(corsOptions));

app.use(express.json());

// ✅ Your routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/appointments', require('./routes/appointmentRoutes'));

app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
