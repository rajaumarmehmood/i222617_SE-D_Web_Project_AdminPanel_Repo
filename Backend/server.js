const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const settingsRoutes = require('./routes/settings');
const propertyRoutes = require('./routes/property');
const analyticsRoutes = require('./routes/analyticsRoutes');
const cors = require('cors');

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(cors());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/properties', propertyRoutes);
app.use('/api/analytics', analyticsRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
