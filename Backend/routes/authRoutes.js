// const express = require('express');
// const { signup, login } = require('../controllers/authController');
// const router = express.Router();

// // POST /api/auth/signup - User Signup
// router.post('/signup', signup);

// // POST /api/auth/login - User Login
// router.post('/login', login);

// module.exports = router;
const express = require('express');
const { signup, login } = require('../controllers/authController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

// Admin signup route
router.post('/signup', signup);

// Admin login route
router.post('/login', login);

// Protected route example (for testing)
router.get('/protected', protect, (req, res) => {
  res.json({ message: `Welcome Admin, ${req.admin.username}` });
});

module.exports = router;
