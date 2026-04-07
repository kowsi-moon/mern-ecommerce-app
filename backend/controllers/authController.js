const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // --- ADMIN CHECK ---
    
    if (email === "admin@luxora.com" && password === "Luxora@2026") {
      const adminId = "65f1a2b3c4d5e6f7a8b9c0d1"; // Valid ObjectId format
      const token = jwt.sign(
        { id: adminId, isAdmin: true }, 
        process.env.JWT_SECRET, 
        { expiresIn: '1d' }
      );
      
      return res.json({
        token,
        user: { id: adminId, name: 'Admin', email, isAdmin: true }
      });
    }

    // --- NORMAL USER CHECK ---
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, isAdmin: false }, 
      process.env.JWT_SECRET, 
      { expiresIn: '1d' }
    );

    res.json({ 
      token, 
      user: { id: user._id, name: user.name, email: user.email, isAdmin: false } 
    });

  } catch (err) {
    console.error("Login Error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};