// const analyticsRoutes = require('./controllers/AnalyticsController');
// app.use('/api/analytics', analyticsRoutes);
const express = require('express');
const { getAnalytics, updateAnalytics } = require('../controllers/AnalyticsController');
const router = express.Router();

// Get analytics data
router.get('/', getAnalytics);

// Update analytics data
router.put('/', updateAnalytics);

module.exports = router;
