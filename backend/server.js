const express = require("express");
const cors = require("cors");
const path = require("path"); // 1. Import path
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const driverRoutes = require("./routes/driverRoutes");
const cabRoutes = require("./routes/cabRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

const app = express();

// ================= MIDDLEWARE =================
app.use(cors());
app.use(express.json());

// ================= API ROUTES =================
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/drivers", driverRoutes);
app.use("/api/cabs", cabRoutes);
app.use("/api/bookings", bookingRoutes);

// ================= SERVE FRONTEND =================
// Determine path to frontend build output directory (adjust folder names if needed)
// Common build folders: 'frontend/dist' (Vite) or 'frontend/build' (Create React App)
const frontendBuildPath = path.join(__dirname, "frontend/dist");

// Serve static assets
app.use(express.static(frontendBuildPath));

// Fallback route: Send index.html for any request that isn't an API route
app.get("*", (req, res) => {
  res.sendFile(path.join(frontendBuildPath, "index.html"));
});

// ================= SERVER =================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
