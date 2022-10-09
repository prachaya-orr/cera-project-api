const fs = require('fs');
const cloudinary = require('../utils/cloudinary');

const AppError = require('../utils/appError');
const { ProductImage, Product, ProductList } = require('../models');

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
    const { productName, size, color, unitPrice, countStock } =
      req.body;

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


exports.deleteProduct = async (req, res, next) => {
	try {
		const { id } = req.params;

		const product = await Product.findOne({ where: { id } });

		if (!product) {
			return res.status(400).json({ message: 'cannot delete the product' });
		}

		await product.destroy();
		res.status(200).json({ message: 'Delete Product Success' });
	} catch (err) {
		next(err);
	}
};
