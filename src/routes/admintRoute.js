const express = require('express');

const upload = require('../middlewares/upload');
const adminController = require('../controllers/adminController');

const router = express.Router();

router.get('/', adminController.getAllProducts);
router.post(
  '/',
  upload.fields([{ name: 'imageUrl', maxCount: 1 }]),
  adminController.createProduct
);

module.exports = router;
