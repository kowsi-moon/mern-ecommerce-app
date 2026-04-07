const Order = require('../models/Order');
const express = require('express');
const router = express.Router();

// POST: /api/orders
router.post('/', async (req, res) => {
  try {
    console.log("Incoming Order Data:", req.body); // Terminal-la check panna

    // Mapping check: Frontend 'shippingAddress' nu anupura data-va inga receive panroom
    const { items, shippingAddress, totalAmount, user } = req.body;

    const newOrder = new Order({
      items,
      shippingAddress, // Schema-la irukara field name idhu thaan
      totalAmount,
      user: user || null, // Optional: User login panni irundha ID varum
      status: 'Pending'
    });

    const savedOrder = await newOrder.save();
    console.log("Order saved successfully in DB!");
    
    res.status(201).json({ 
      success: true, 
      message: "Order stored successfully!", 
      order: savedOrder 
    });

  } catch (error) {
    console.error("Order Save Error Details:", error);
    
    // Duplicate Key Error handle panrathu (E11000)
    if (error.code === 11000) {
      return res.status(400).json({ 
        success: false, 
        message: "Duplicate Error: Check your MongoDB Indexes for orderId_1" 
      });
    }

    res.status(400).json({ 
      success: false, 
      error: error.message 
    });
  }
});

module.exports = router;