
const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
  imageUrls: {
    type: [String], // Array of image URLs
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  location: {
    type: { type: String, enum: ['Point'], required: true }, // Specify type as 'Point'
    coordinates: { type: [Number], required: true } // Coordinates should be an array of numbers
  },
  buyOrRent: {
    type: String,
    enum: ["buy", "rent"],
    required: true,
  },
  area: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  beds: {
    type: Number,
    required: true,
  },
  baths: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  parking: {
    type: String,
    required: true,
  },
  outdoor: {
    type: String,
    required: true,
  },
  ac: {
    type: String,
    required: true,
  },
  hoa: {
    type: String,
    required: true,
  },
  pricePerM2: {
    type: String,
    required: true,
  },
  listedOn: {
    type: Date,
    default: Date.now,
  },
  heatingFuel: {
    type: String,
  },
  coolingSystem: {
    type: String,
  },
  heating: {
    type: String,
  },
  stories: {
    type: Number,
  },
  entrances: {
    type: String,
  },
  floors: {
    type: String,
  },
  iron: {
    type: Boolean,
  },
  dishwasher: {
    type: Boolean,
  },
  cable: {
    type: Boolean,
  },
  numRooms: {
    type: Number,
  },
  roomTypes: {
    type: String,
  },
  fans: {
    type: String,
  },
  numWindows: {
    type: Number,
  },
  numDoors: {
    type: Number,
  },
  windowType: {
    type: String,
  },
  floorType: {
    type: String,
  },
  wallType: {
    type: String,
  },
  yearBuilt: {
    type: String,
  },
  propertyType: {
    type: String,
  },
  pricePerSqft: {
    type: String,
  },
  unitsInBuilding: {
    type: Number,
  },
  lotArea: {
    type: String,
  },
  exterior: {
    type: String,
  },
  roof: {
    type: String,
  },
  lawn: {
    type: Boolean,
  },
  parkingSpaces: {
    type: Number,
  },
  carport: {
    type: Boolean,
  },
  pool: {
    type: Boolean,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // Reference to the User model (seller)
  },
});

propertySchema.index({ location: '2dsphere' }); // Add geospatial index for querying

const Property = mongoose.model("Property", propertySchema);

module.exports = Property;
