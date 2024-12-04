// controllers/adminController.js
const Admin = require('../models/Admin');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Admin Registration
exports.registerAdmin = async (req, res) => {
    const { fullName, email, password } = req.body;
  
    try {
      // Check if the email is already registered
      const existingAdmin = await Admin.findOne({ email });
      if (existingAdmin) {
        return res.status(400).json({ success: false, message: 'Email already registered' });
      }
  
      // Create a new admin and save it to the database
      const newAdmin = new Admin({ fullName, email, password });
      await newAdmin.save();
  
      // Create a JWT token for the new admin
      const token = jwt.sign({ id: newAdmin._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
      // Send the response with admin details (excluding password)
      res.status(201).json({
        success: true,
        message: 'Admin registered successfully',
        token,
        type: 'admin',
        admin: {
          id: newAdmin._id,
          fullName: newAdmin.fullName,
          email: newAdmin.email,
          createdAt: newAdmin.createdAt,
        },
      });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
  };
  
// Admin Login
exports.loginAdmin = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Check if admin exists
      const admin = await Admin.findOne({ email });
      if (!admin) {
        return res.status(401).json({ success: false, message: 'Invalid email or password' });
      }
  
      // Compare provided password with stored hash
      const isMatch = await bcrypt.compare(password, admin.password);
      if (!isMatch) {
        return res.status(401).json({ success: false, message: 'Invalid email or password' });
      }
  
      // Generate JWT token
      const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
      // Send the response with admin details (excluding password)
      res.status(200).json({
        success: true,
        message: 'Login successful',
        token,
        type: 'admin',
        admin: {
          id: admin._id,
          fullName: admin.fullName,
          email: admin.email,
          createdAt: admin.createdAt,
        },
      });
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
  };
  