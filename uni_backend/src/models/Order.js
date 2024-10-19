const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  deliveryAddress: { type: String, required: true },
  orderStatus: { type: String, enum: ['PENDING', 'DELIVERED'], default: 'PENDING' },
  createdAt: { type: Date, default: Date.now },
  adminId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  orderItems: [{
    uniformId: { type: mongoose.Schema.Types.ObjectId, ref: 'Uniform', required: true },
    quantity: { type: Number, required: true, default: 1 }
  }]
});

module.exports = mongoose.model('Order', orderSchema);