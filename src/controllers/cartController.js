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
