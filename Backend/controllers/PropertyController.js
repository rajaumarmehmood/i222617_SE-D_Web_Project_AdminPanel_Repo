const Property = require('../models/Property');

// Get all properties
exports.getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find();
    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching properties', error });
  }
};

// Search properties by name or location
exports.searchProperties = async (req, res) => {
  const { query, lat, lng, maxDistance } = req.query;

  try {
    const searchConditions = [];

    if (query) {
      // Add regex-based searches
      searchConditions.push(
        { address: { $regex: query, $options: 'i' } }, // Address regex search
        { buyOrRent: { $regex: query, $options: 'i' } }, // Buy or rent regex search
        { description: { $regex: query, $options: 'i' } } // Description regex search
      );

      // Price search if query is a valid number
      if (!isNaN(query)) {
        searchConditions.push({ price: { $lte: parseFloat(query) } });
      }
    }

    // Add geospatial search if lat and lng are provided
    if (lat && lng) {
      const locationQuery = {
        location: {
          $near: {
            $geometry: { type: 'Point', coordinates: [parseFloat(lng), parseFloat(lat)] },
            $maxDistance: maxDistance ? parseInt(maxDistance, 10) : 5000, // Default max distance: 5000 meters
          },
        },
      };
      searchConditions.push(locationQuery);
    }

    // If no specific query, return all properties
    const properties = await Property.find(
      query || (lat && lng)
        ? { $or: searchConditions } // Apply conditions if query or lat/lng exists
        : {} // Fetch all properties if no query or location parameters are provided
    );

    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ message: 'Error searching properties', error });
  }
};

  

// Delete a property by ID
exports.deleteProperty = async (req, res) => {
  const { id } = req.params;
  try {
    await Property.findByIdAndDelete(id);
    res.status(200).json({ message: 'Property removed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting property', error });
  }
};

// Get a property by ID
exports.getPropertyById = async (req, res) => {
  const { id } = req.params;
  try {
    const property = await Property.findById(id);
    res.status(200).json(property);
  }
  catch (error) {
    res.status(500).json({ message: 'Error fetching property', error });
    }
  };

// module.exports = { getAllProperties, searchProperties, deleteProperty };
