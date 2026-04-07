const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const User = require('../models/User');


//  GET ALL ORDERS (WITH USER DATA)
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('user', 'name email')
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// CREATE ORDER
router.post('/', async (req, res) => {
  try {
    console.log(" Incoming Order Data:", req.body);

    const { items, shippingAddress, totalAmount, userId } = req.body;

    //  VALIDATION
    if (!userId) {
      return res.status(400).json({ message: "User ID missing" });
    }

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    //  CHECK USER EXISTS
    const userExists = await User.findById(userId);
    if (!userExists) {
      return res.status(400).json({ message: "User not found" });
    }

    //  CREATE ORDER WITH DEFAULT STATUS
    const newOrder = new Order({
      items,
      shippingAddress,
      totalAmount,
      user: userId,
      status: "Pending" //  IMPORTANT FIX
    });

    const savedOrder = await newOrder.save();

    //  UPDATE ORDER COUNT
    await User.findByIdAndUpdate(
      userId,
      { $inc: { orderCount: 1 } },
      { returnDocument: 'after' }
    );

    res.status(201).json({
      success: true,
      message: "Order stored successfully!",
      order: savedOrder
    });

  } catch (err) {
    console.error(" ORDER ERROR:", err); 
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});


//  UPDATE STATUS
router.put('/:id', async (req, res) => {
  try {
    const { status } = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { returnDocument: 'after' }
    );

    res.json(updatedOrder);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


//  FIX OLD ORDERS
router.get('/fix-order-count', async (req, res) => {
  try {
    const users = await User.find();

    for (let user of users) {
      const count = await Order.countDocuments({
        user: user._id
      });

      user.orderCount = count;
      await user.save();
    }

    res.json({
      success: true,
      message: "Order count fixed correctly!"
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;