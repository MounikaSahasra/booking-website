const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
const app = express();
connectDB();

// ✅ Custom CORS middleware
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://appointment-booking-syst-ad120.web.app");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    return res.sendStatus(204); // Preflight request
  }

  next();
});

app.use(express.json());

// ✅ Routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/appointments", require("./routes/appointmentRoutes"));

// ✅ Default route
app.get("/", (req, res) => {
  res.json({ message: "API is running with manual CORS config" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
