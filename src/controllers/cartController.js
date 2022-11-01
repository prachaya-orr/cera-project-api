const { where } = require('sequelize');
const { CartItem, Product, ProductImage, ProductList } = require('../models');
const AppError = require('../utils/appError');

exports.createCart = async (req, res, next) => {
  try {
    const { productId } = req.body;
    // const { id } = req.params;

    const userId = req.user.id;
    console.log(userId);
    const cart = await CartItem.findOne({
      where: { userId, productId },
    });
    // console.log(cart);
    if (cart) {
      throw new AppError('already have this item in cart', 400);
    }

    const item = {
      userId,
      productId,
      quantity: 1,
    };

    await CartItem.create(item);

    const JoinCartData = await CartItem.findOne({
      where: { userId, productId },
      include: [
        {
          model: Product,
          include: [{ model: ProductList }, { model: ProductImage }],
        },
      ],
    });

    const {
      Product: {
        productName,
        unitPrice,
        ProductLists: [{ sizeValue, colorValue, countStock }],
        ProductImages: [{ imageUrl }],
      },
    } = JoinCartData;

    res.status(200).json({ JoinCartData });
  } catch (err) {
    next(err);
  }
};

exports.getCart = async (req, res, next) => {
  try {
    // const items = await CartItem.findAll({
    //   where: { userId: req.user.id },
    //   include: Product,
    // });

    const JoinCartData = await CartItem.findAll({
      where: { userId: req.user.id },
      include: [
        {
          model: Product,
          include: [{ model: ProductList }, { model: ProductImage }],
        },
      ],
    });

    res.status(201).json({ JoinCartData });
  } catch (err) {
    next(err);
  }
};

exports.deleteCart = async (req, res, next) => {
  try {
    const { cartId } = req.params;

    await CartItem.destroy({ where: { id: cartId } });
    res.status(200).json({ message: 'success Delete' });
  } catch (err) {
    next(err);
  }
};

exports.updateCart = async (req, res, next) => {
  try {
    const { cartItem } = req.body;
    console.log(cartItem, '42342');

    const item = await CartItem.update(cartItem, { where: { id: cartItem.id } });
    // console.log(res);
    res.status(200).json({ item });
  } catch (err) {
    next(err);
  }
};

exports.getTotalPrice = async (req, res, next) => {
  try {
    const JoinCartData = await CartItem.findAll({
      where: { userId: req.user.id },
      include: [
        {
          model: Product,
          attributes: ['unitPrice'],
        },
      ],
    });

    const totalPrice = JoinCartData.reduce(
      (a, c) => a + c?.quantity * c?.Product?.unitPrice,
      0
    );

    console.log(totalPrice);

    res.status(201).json({ totalPrice });
  } catch (err) {
    next(err);
  }
};
