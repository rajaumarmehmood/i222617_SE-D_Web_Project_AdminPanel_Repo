const express = require('express');
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
router.delete('/:id', deleteProperty);
router.get('/:id', getPropertyById);

module.exports = router;
