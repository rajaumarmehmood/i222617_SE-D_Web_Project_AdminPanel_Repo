const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const settingsRoutes = require('./routes/settings');
const propertyRoutes = require('./routes/property');
const analyticsRoutes = require('./routes/analyticsRoutes');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { auth } = require('google-auth-library');
const bodyParser = require('body-parser');
const Admin = require('./models/adminModel');

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000', // Replace with your frontend's URL
    credentials: true, // Allows cookies to be sent
  }));
app.use(cookieParser());
app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/properties', propertyRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use("/api/admins", adminRoutes);

app.post("/api/auth/save-pin", async (req, res) => {
  const { email, pin } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (admin) {
      admin.pin = pin;
      await admin.save();
      res.json({ success: true, message: "PIN saved successfully." });
    } else {
      res.status(404).json({ success: false, message: "Admin not found." });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
});

// Verify PIN
app.post("/api/auth/verify-pin", async (req, res) => {
  const { email, pin } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (admin && admin.pin === pin) {
      admin.pin = null; // Clear the PIN after verification
      await admin.save();
      res.json({ success: true });
    } else {
      res.status(400).json({ success: false, message: "Invalid PIN." });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
});

// Reset Password
app.post("/api/auth/reset-password", async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (admin) {
      admin.password = password; // Update password
      await admin.save();
      res.json({ success: true, message: "Password reset successfully." });
    } else {
      res.status(404).json({ success: false, message: "Admin not found." });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
