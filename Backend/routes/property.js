const express = require('express');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();
const {
    getAllProperties,
    searchProperties,
    deleteProperty,
    getPropertyById,
} = require('../controllers/PropertyController');

// Property routes
router.get('/', getAllProperties);
router.get('/search', searchProperties);
router.delete('/:id', protect, deleteProperty);
router.get('/:id', getPropertyById);

module.exports = router;
