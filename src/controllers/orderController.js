const { Order } = require('../models');

exports.createOrder = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const order = await Order.create(userId);
    res.status(201).json({ order });
  } catch (err) {
    next(err);
  }
};
