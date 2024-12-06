const mongoose = require('mongoose');

const AnalyticsSchema = new mongoose.Schema({
  popularProperties: [
    {
      propertyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Property' },
      views: { type: Number, required: true },
      // address: { type: String, required: true },
    },
  ],
  topSellers: [
    {
      sellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      sales: { type: Number, required: true },
    },
  ],
  transactions: [
    {
      transactionId: { type: String },
      propertyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Property' },
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      amount: { type: Number, required: true },
      date: { type: Date, required: true },
    },
  ],
  platformActivity: {
    usersCount: { type: Number, required: true },
    propertiesCount: { type: Number, required: true },
    transactionsCount: { type: Number, required: true },
  },
});

const Analytics = mongoose.model('Analytics', AnalyticsSchema);

module.exports = Analytics;
