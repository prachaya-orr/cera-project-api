const express = require('express');

const AppError = require('../utils/appError');
const productController = require('../controllers/productController');

const router = express.Router();

router.get('/', productController.getAllProducts);

module.exports = router;
