const express = require('express');
const router = express.Router();


const Product = require('../models/Product'); 
const User = require('../models/User');

// GET /api/admin/dashboard-stats
router.get('/dashboard-stats', async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();
    const totalUsers = await User.countDocuments();
    
    // Static placeholders as per your code
    const totalOrders = 15; 
    const totalRevenue = 15000;

    res.json({
      revenue: totalRevenue,
      orders: totalOrders,
      users: totalUsers,
      products: totalProducts 
    });
  } catch (err) {
    console.error("Stats Error:", err);
    res.status(500).json({ message: "Server stats error", error: err.message });
  }
});

module.exports = router;