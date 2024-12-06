const User = require('../models/userModel');

// Get all users
exports.getUsers = async (req, res) => {
  // console.log("get");
  
  try {
    // console.log("getting Users");
    const users = await User.find();
    // console.log("Got");
    // console.log(users);
    res.status(200).json(users);
  } catch (error) {
    // console.log("catch");
    res.status(500).json({ message: error.message });
  }
};

// Search users
exports.searchUsers = async (req, res) => {
  const { query } = req.params;
  try {
    const users = await User.find({ name: new RegExp(query, 'i') });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Approve user account
exports.approveUser = async (req, res) => {
  const { id } = req.params;

  try {
    // console.log(`Attempting to approve user with ID: ${id}`);
    const user = await User.findByIdAndUpdate(
      id,
      { isApproved: true, isBlocked: false },
      { new: true }
    );

    if (!user) {
      // console.error('User not found');
      return res.status(404).json({ message: 'User not found' });
    }

    // console.log('User approved successfully:', user);
    res.status(200).json(user);
  } catch (error) {
    console.error('Error approving user:', error.message);
    res.status(500).json({ message: error.message });
  }
};

// Block/Suspend user account
exports.blockUser = async (req, res) => {
  const { id } = req.params;

  try {
    console.log(`Attempting to block user with ID: ${id}`);
    const user = await User.findByIdAndUpdate(
      id,
      { isBlocked: true, isApproved: false },
      { new: true }
    );

    if (!user) {
      console.error('User not found');
      return res.status(404).json({ message: 'User not found' });
    }

    console.log('User blocked successfully:', user);
    res.status(200).json(user);
  } catch (error) {
    console.error('Error blocking user:', error.message);
    res.status(500).json({ message: error.message });
  }
};


// Set permissions
exports.setPermissions = async (req, res) => {
  const { id } = req.params;
  const { permissions } = req.body;
  try {
    const user = await User.findByIdAndUpdate(id, { permissions }, { new: true });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// View and Edit profile
exports.getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete user profile
exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
