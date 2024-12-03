const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const settingsRoutes = require('./routes/settings');

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use('/api/settings', settingsRoutes);

// Routes
app.use('/api/users', userRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
