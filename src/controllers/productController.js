const { Product, ProductImage, ProductList } = require('../models');

exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.findAll({
      include: [ProductImage, ProductList],
    });
    res.status(200).json({ products });
  } catch (err) {
    next(err);
  }
};
