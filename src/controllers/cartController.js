const { Cart, Product } = require('../models');
const AppError = require('../utils/appError');

exports.createCart = async (req, res, next) => {
  try {
    const { productId } = req.body;
    // const { id } = req.params;

    const userId = req.user.id;

    const cart = await Cart.findOne({
      where: { userId, productId }
    });
    console.log(cart);
    if (cart) {
      throw new AppError('already have this item in cart', 400);
    }

    const item = {
      userId,
      productId,
      quantity: 1
    };

    const createCartFromUser = await Cart.create(item);
    res.status(200).json({ createCartFromUser });
  } catch (err) {
    next(err);
  }
};

exports.deleteCart = async (req, res, next) => {
  try {
    const { cartId } = req.params;
    await Cart.destroy({ where: { id: cartId } });
    res.status(200).json('success delete');
  } catch (err) {
    next(err);
  }
};

exports.getCart = async (req, res, next) => {
  try {
    const items = await Cart.findAll({
      where: { userId: req.user.id },
      include: Product
    });

    res.status(201).json({ items });
  } catch (err) {
    next(err);
  }
};
