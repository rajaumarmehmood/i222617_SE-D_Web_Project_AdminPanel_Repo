const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const Admin = require('../models/adminModel');

const validateEmail = (email) => {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return regex.test(email);
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !validateEmail(email)) {
    return res.status(400).json({ message: 'Invalid email format' });
  }

  if (!password || password.length < 8) {
    return res.status(400).json({ message: 'Password must be at least 8 characters long' });
  }

  try {
    // Check if logging in as admin
    const admin = await Admin.findOne({ email });
    
    if (admin) {
      // console.log('Admin has matchPassword:', typeof admin.matchPassword === 'function');
      const isMatch = await admin.matchPassword(password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid admin credentials' });
      }
      // console.log(process.env.JWT_SECRET);
      
      const token = jwt.sign({ id: admin._id, isAdmin: true }, process.env.JWT_SECRET, { expiresIn: '1d' });
      console.log(` LogIN token ${token}`);
      res.cookie('token', token, { httpOnly: true, secure: false });
      console.log('Cookie set:', req.cookies);
      console.log('Admin login successful');
      return res.status(200).json({ message: 'Admin login successful', token });
    }

    // Otherwise, check if logging in as a user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.cookie('token', token, { httpOnly: true, secure: false });
    return res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const signup = async (req, res) => {
  const { username, email, password } = req.body;

  if (!email || !validateEmail(email)) {
    return res.status(400).json({ message: 'Invalid email format' });
  }

  if (!password || password.length < 8) {
    return res.status(400).json({ message: 'Password must be at least 8 characters long' });
  }

  try {
    const adminExists = await Admin.findOne({ email });
    if (adminExists) {
      return res.status(400).json({ message: 'Admin already exists' });
    } else {
      const newAdmin = new Admin({ username, email, password });
      await newAdmin.save();

      // Generate token for the newly created admin
      const token = jwt.sign({ id: newAdmin._id, isAdmin: true }, process.env.JWT_SECRET, { expiresIn: '1d' });
      console.log(`SignUptoken ${token}`);
      
      // Send token in response
      res.cookie('token', token, { httpOnly: true, secure: false });
      return res.status(201).json({ message: 'Admin created successfully', token });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};



module.exports = { signup, login };
