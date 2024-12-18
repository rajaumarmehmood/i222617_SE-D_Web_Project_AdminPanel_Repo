// const express = require('express');
// const router = express.Router();
// const Property = require('../models/Property');
// const Transaction = require('../models/Transaction');
// const User = require('../models/User');

// // Get popular properties
// router.get('/popular-properties', async (req, res) => {
//     try {
//         const properties = await Property.find().sort({ views: -1 }).limit(5);
//         res.status(200).json(properties);
//     } catch (error) {
//         res.status(500).json({ message: 'Error fetching popular properties', error });
//     }
// });

// // Get transaction reports
// router.get('/transactions', async (req, res) => {
//     try {
//         const transactions = await Transaction.find().sort({ date: -1 });
//         res.status(200).json(transactions);
//     } catch (error) {
//         res.status(500).json({ message: 'Error fetching transaction reports', error });
//     }
// });

// // Get platform activity
// router.get('/platform-activity', async (req, res) => {
//     try {
//         const usersCount = await User.countDocuments();
//         const propertiesCount = await Property.countDocuments();
//         const transactionsCount = await Transaction.countDocuments();

//         res.status(200).json({
//             usersCount,
//             propertiesCount,
//             transactionsCount,
//         });
//     } catch (error) {
//         res.status(500).json({ message: 'Error fetching platform activity', error });
//     }
// });

// module.exports = router;

const Analytics = require('../models/analyticsModel');

// Get analytics data
const getAnalytics = async (req, res) => {
  try {
    const analytics = await Analytics.findOne();
    res.status(200).json(analytics);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching analytics data', error });
  }
};

// Update analytics data
const updateAnalytics = async (req, res) => {
  const { popularProperties, topSellers, transactions, platformActivity } = req.body;

  try {
    const analytics = await Analytics.findOneAndUpdate(
      {},
      { popularProperties, topSellers, transactions, platformActivity },
      { new: true, upsert: true } // Create if doesn't exist
    );
    res.status(200).json(analytics);
  } catch (error) {
    res.status(500).json({ message: 'Error updating analytics data', error });
  }
};

module.exports = { getAnalytics, updateAnalytics };
