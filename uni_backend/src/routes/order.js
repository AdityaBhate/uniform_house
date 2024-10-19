const express = require('express');
const Order = require('../models/Order');
const { authenticateToken, isAdmin } = require('../middleware/auth');

const router = express.Router();

router.get('/', authenticateToken, async (req, res) => {
  try {
    const orders = req.user.isAdmin
      ? await Order.find().populate('userId').populate('orderItems.uniformId')
      : await Order.find({ userId: req.user.userId }).populate('orderItems.uniformId');
    res.json(orders);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/', authenticateToken, async (req, res) => {
  try {
    const { customerName, deliveryAddress, orderItems } = req.body;
    const order = new Order({
      customerName,
      deliveryAddress,
      userId: req.user.userId,
      adminId: req.user.isAdmin ? req.user.userId : null,
      orderItems
    });
    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/:id', authenticateToken, isAdmin, async (req, res) => {
  try {
    const { orderStatus } = req.body;
    const order = await Order.findByIdAndUpdate(req.params.id, { orderStatus }, { new: true });
    res.json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;