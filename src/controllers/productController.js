const cloudinary = require('../utils/cloudinary');
const { ProductImage, Product } = require('../models');

exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.status(200).json({ products });
  } catch (err) {
    next(err);
  }
};
exports.createProduct = async (req, res, next) => {
  try {
    const { productName, size, unitPrice, ImageUrl } = req.body;
    const createProduct = await Product.create({
      productName,
      size,
      unitPrice,
    });
    const uploadProductImage = await ProductImage.create({ ImageUrl });
    res
      .status(200)
      .json({ product: { ...createProduct, ...uploadProductImage } });
  } catch (err) {
    next(err);
  }
};
