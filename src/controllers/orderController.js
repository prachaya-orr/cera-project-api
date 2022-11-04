const { Order, CartItem, Product, OrderItem } = require('../models');

exports.createOrder = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { id: orderId } = await Order.create({ userId });
    const cartItems = await CartItem.findAll({
      where: { userId },
      include: [{ model: Product, attributes: ['unitPrice'] }],
    });

    for (const cartItem of cartItems) {
      // console.log(JSON.parse(JSON.stringify(cartItem)));
      const {
        quantity,
        productId,
        Product: { unitPrice },
      } = JSON.parse(JSON.stringify(cartItem));
      const netPrice = quantity * unitPrice;
      await OrderItem.create({ quantity, netPrice, orderId, productId });
    }

    const OrderItems = await OrderItem.findAll({ where: { orderId } });

    res.status(201).json({ OrderItems });
  } catch (err) {
    next(err);
  }
};

exports.updateStatusOrder = async (req, res, next) => {
  try {
    const userId = req.userId;

    const { id: orderId } = await Order.findOne({ where: userId });

    await Order.update({ status: 'SUCCESS' }, { where: { id: orderId } });
    res.status(200).json({ message: 'status order : payment success' });
  } catch (err) {
    next(err);
  }
};


