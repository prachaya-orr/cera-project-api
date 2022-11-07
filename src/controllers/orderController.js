const { Order } = require('../models');

exports.updateStatusOrder = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const { id: orderId } = await Order.findOne({
      where: { userId },
      limit: 1,
      order: [['createdAt', 'DESC']],
    });

    await Order.update({ status: 'SUCCESS' }, { where: { id: orderId } });
    res.status(200).json({ message: 'status order : payment success' });
  } catch (err) {
    next(err);
  }
};
