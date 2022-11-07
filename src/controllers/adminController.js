const fs = require('fs');
const cloudinary = require('../utils/cloudinary');

const AppError = require('../utils/appError');
const {
  ProductImage,
  Product,
  ProductList,
  OrderItem,
  Order,
  User,
} = require('../models');

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
    const { productName, size, color, unitPrice, countStock } = req.body;

    if (!productName) {
      throw new AppError('Product Name is required', 400);
    }

    if (!size) {
      throw new AppError('Size is required', 400);
    }

    if (!color) {
      throw new AppError('Color is required', 400);
    }

    if (!countStock) {
      throw new AppError('Quantity is required', 400);
    }

    if (!unitPrice) {
      throw new AppError('Unit Price is required', 400);
    }

    const secureUrl = await cloudinary.upload(req.files.imageUrl[0].path); // เอา path ที่แสดงรูปภาพอัพโหลดขึ้น cloudinary ตัวอย่าง path --> path: 'public\\images\\16646423181158004117809.jpeg'
    // console.log(secureUrl); // secureUrl คือ link รูปที่อยู่บน cloudinary
    fs.unlinkSync(req.files.imageUrl[0].path); // ลบ path ที่แสดงรูปภาพออกจากคอมเรา (คือการลบไฟล์รูปภาพที่อัพโหลดขึ้น cloudinary แล้ว ออกจากคอม)

    if (!secureUrl) {
      throw new AppError('Product Image is required', 400);
    }

    const createProduct = await Product.create({
      productName,
      unitPrice,
    });

    const createProductList = await ProductList.create({
      productId: createProduct.dataValues.id,
      sizeValue: size,
      colorValue: color,
      countStock: countStock,
    });

    const createProductImage = await ProductImage.create({
      productId: createProduct.dataValues.id,
      imageUrl: secureUrl,
    });

    res.status(200).json({
      createProduct,
      createProductList,
      createProductImage,
    });
  } catch (err) {
    next(err);
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const { productName, size, color, unitPrice, countStock } = req.body;
    const { id } = req.params;
    console.log(req.files);

    const seletedProduct = await ProductImage.findOne({
      where: { productId: id },
    });

    // console.log(seletedProduct);
    const imageUrl = seletedProduct.imageUrl;
    console.log(imageUrl);

    if (req.files?.imageUrl?.[0]) {
      var secureUrlUpdate = await cloudinary.upload(
        req.files?.imageUrl?.[0].path,
        imageUrl ? cloudinary.getPublicId(imageUrl) : undefined
      );
    }

    const updateValueProduct = {};
    const updateValueProductList = {};
    const updateValueProductImage = {};

    if (productName) {
      updateValueProduct.productName = productName;
    }

    if (size) {
      updateValueProductList.sizeValue = size;
    }

    if (color) {
      updateValueProductList.colorValue = color;
    }

    if (unitPrice) {
      updateValueProduct.unitPrice = unitPrice;
    }

    if (countStock) {
      updateValueProductList.countStock = countStock;
    }

    if (req.files?.imageUrl?.[0]) {
      updateValueProductImage.imageUrl = secureUrlUpdate;
      fs.unlinkSync(req.files?.imageUrl?.[0].path);
    }

    await Product.update(updateValueProduct, {
      where: { id },
    });

    await ProductList.update(updateValueProductList, {
      where: { productId: id },
    });
    if (req.files?.imageUrl?.[0]) {
      await ProductImage.update(updateValueProductImage, {
        where: { productId: id },
      });
    }
    res.status(200).json({ message: 'Update Success' });
  } catch (err) {
    next(err);
  }
};

exports.getOne = async (req, res, next) => {
  try {
    const { id } = req.params;

    const thisProduct = await Product.findOne({
      where: { id: id },
      include: [ProductImage, ProductList],
    });

    res.status(200).json({ thisProduct });
  } catch (err) {
    next(err);
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    const product = await Product.findOne({ where: { id } });
    const productImage = await ProductImage.findOne({
      where: { productId: id },
    });
    console.log(productImage.imageUrl);
    const secureUrl = await cloudinary.getPublicId(productImage.imageUrl);
    console.log(secureUrl);

    if (!product) {
      return res.status(400).json({ message: 'cannot delete the product' });
    }

    await product.destroy();
    await cloudinary.deletePic(secureUrl);
    res.status(200).json({ message: 'Delete Product Success' });
  } catch (err) {
    next(err);
  }
};

exports.getAllOrders = async (req, res, next) => {
  try {
    const OrderItems = await OrderItem.findAll({
      include: [
        {
          model: Order,
          attributes: ['status'],
          include: [
            {
              model: User,
              attributes: ['firstName'],
            },
          ],
        },

        { model: Product, attributes: ['productName'] },
      ],
    });
    res.status(200).json({ OrderItems });
  } catch (err) {
    next(err);
  }
};
