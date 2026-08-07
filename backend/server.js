const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const driverRoutes = require("./routes/driverRoutes");
const cabRoutes = require("./routes/cabRoutes");

const app = express();

// ================= DEBUG =================
console.log("authRoutes =", authRoutes);
console.log("userRoutes =", userRoutes);
console.log("adminRoutes =", adminRoutes);
console.log("driverRoutes =", driverRoutes);
console.log("cabRoutes =", cabRoutes);

// ================= MIDDLEWARE =================
app.use(cors());
app.use(express.json());

// ================= ROUTES =================
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/drivers", driverRoutes);
app.use("/api/cabs", cabRoutes);

// ================= HOME =================
app.get("/", (req, res) => {
  res.send("🚖 Cab Booking Portal Backend Running!");
});

// ================= SERVER =================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
