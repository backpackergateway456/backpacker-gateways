const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const roomRoutes = require("./routes/roomRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// Room API
app.use("/api/rooms", roomRoutes);

// Booking API
app.use("/api/bookings", bookingRoutes);

// Admin API
app.use("/api/admin", adminRoutes);

// Home route
app.get("/", (req, res) => {
res.json({
success: true,
message: "Himalayan Backpacker House API is running",
});
});

const PORT = process.env.PORT || 5000;

connectDB()
.then(() => {
app.listen(PORT, () => {
console.log(
`Backend running on http://localhost:${PORT}`
);
});
})
.catch((error) => {
console.error(
"Server startup failed:",
error.message
);
});
