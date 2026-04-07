const Product = require('../models/Product');
const Order = require('../models/Order'); // Make sure you have an Order model

// Get dashboard stats
exports.getDashboardStats = async (req, res) => {
  try {
    // Get total products
    const totalProducts = await Product.countDocuments();

    // Get all products to calculate revenue
    const products = await Product.find();
    const totalRevenue = products.reduce((sum, product) => sum + (product.price * product.stock), 0);

    // Get total orders count
    const totalOrders = await Order.countDocuments();

    // Get total users (if you have a User model)
    const totalUsers = 0; 

    res.json({
      revenue: totalRevenue,
      orders: totalOrders,
      products: totalProducts,
      users: totalUsers
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};