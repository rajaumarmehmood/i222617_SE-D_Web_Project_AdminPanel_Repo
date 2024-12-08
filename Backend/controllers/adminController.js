const Admin = require("../models/adminModel");

// Get all admins
const getAdmins = async (req, res) => {
  try {
    const admins = await Admin.find();
    res.json(admins);
  } catch (error) {
    res.status(500).json({ message: "Error fetching admins", error });
  }
};

// Add a new admin
const addAdmin = async (req, res) => {
  const { username, email, password } = req.body;
  console.log("req.body",req.body);
  try {
    const newAdmin = new Admin({ username, email, password });
    await newAdmin.save();
    res.status(201).json({ message: "Admin added successfully", admin: newAdmin });
  } catch (error) {
    res.status(500).json({ message: "Error adding admin", error });
  }
};

// Update an admin
const updateAdmin = async (req, res) => {
  const { id } = req.params;
  const { username, email, password } = req.body;
  try {
    const updatedAdmin = await Admin.findByIdAndUpdate(
      id,
      { username, email, password },
      { new: true }
    );
    res.json({ message: "Admin updated successfully", admin: updatedAdmin });
  } catch (error) {
    res.status(500).json({ message: "Error updating admin", error });
  }
};

// Delete an admin
const deleteAdmin = async (req, res) => {
  const { id } = req.params;
  try {
    await Admin.findByIdAndDelete(id);
    res.json({ message: "Admin deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting admin", error });
  }
};

module.exports = {
  getAdmins,
  addAdmin,
  updateAdmin,
  deleteAdmin,
};
