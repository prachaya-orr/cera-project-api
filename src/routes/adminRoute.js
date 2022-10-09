const express = require('express');

const upload = require('../middlewares/upload');
const adminController = require('../controllers/adminController');

const router = express.Router();

router.get('/editProducts', adminController.getAllProducts);

router.post(
  '/createProduct',
  upload.fields([{ name: 'imageUrl', maxCount: 1 }]),
  adminController.createProduct
);

router.delete('/editProducts/deleteProduct/:id',adminController.deleteProduct)

module.exports = router;
