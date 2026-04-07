const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  items: Array,
  shippingAddress: Object,
  totalAmount: Number,

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' 
  }

}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);