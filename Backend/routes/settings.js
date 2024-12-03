const express = require('express');
const router = express.Router();

// Mock storage (replace with a database in production)
let platformSettings = {
  termsAndPolicies: "Default Terms and Policies",
  isDarkMode: false,
};

// Get settings
router.get('/', (req, res) => {
  res.json(platformSettings);
});

// Update settings
router.put('/', (req, res) => {
  const { termsAndPolicies, isDarkMode } = req.body;
  if (termsAndPolicies !== undefined) platformSettings.termsAndPolicies = termsAndPolicies;
  if (isDarkMode !== undefined) platformSettings.isDarkMode = isDarkMode;
  res.json({ success: true, platformSettings });
});

module.exports = router;
