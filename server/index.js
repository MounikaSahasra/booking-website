const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors"); // ✅ Import CORS
const connectDB = require("./config/db");

dotenv.config();
const app = express();
connectDB();

// ✅ CORS setup using `cors` package
app.use(cors({
  origin: "https://appointment-booking-syst-ad120.web.app", // ✅ Allow your frontend
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

app.use(express.json());

// ✅ Routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/appointments", require("./routes/appointmentRoutes"));

// ✅ Default route
app.get("/", (req, res) => {
  res.json({ message: "API is running with full CORS support" });
});

// ✅ Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
