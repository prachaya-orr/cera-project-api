const { request } = require('express');
const { Product } = require('../models');

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
    const productDat = { productName, size, unitPrice, ImageUrl } = req.body;
    const createProduct = await Product.create({
      productName,
      size,
      unitPrice,
      ImageUrl,
    });
    const uploadProductImage = await productImage.create();
    res.status(200).json({ products });
  } catch (err) {
    next(err);
  }
};
