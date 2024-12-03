const express = require('express');
const router = express.Router();
const Property = require('../models/Property');

// Get all properties
router.get('/', async (req, res) => {
    try {
        const properties = await Property.find();
        res.status(200).json(properties);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching properties', error });
    }
});

// Search properties
router.get('/search', async (req, res) => {
    const { query } = req.query;
    try {
        const properties = await Property.find({ 
            $or: [
                { name: { $regex: query, $options: 'i' } },
                { location: { $regex: query, $options: 'i' } }
            ]
        });
        res.status(200).json(properties);
    } catch (error) {
        res.status(500).json({ message: 'Error searching properties', error });
    }
});

// Delete a property
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Property.findByIdAndDelete(id);
        res.status(200).json({ message: 'Property removed successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting property', error });
    }
});

module.exports = router;
