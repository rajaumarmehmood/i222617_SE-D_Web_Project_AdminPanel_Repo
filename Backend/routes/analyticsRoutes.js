// const analyticsRoutes = require('./controllers/AnalyticsController');
// app.use('/api/analytics', analyticsRoutes);
const express = require('express');
const { getAnalytics, updateAnalytics } = require('../controllers/AnalyticsController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

// Get analytics data
router.get('/', protect, getAnalytics);

// Update analytics data
router.put('/', protect, updateAnalytics);

module.exports = router;
