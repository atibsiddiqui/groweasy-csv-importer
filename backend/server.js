const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Routes
const uploadRoutes = require("./routes/uploadRoutes");

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use("/api", uploadRoutes);

// Test Route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "GrowEasy AI Backend is Running 🚀",
  });
});

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});