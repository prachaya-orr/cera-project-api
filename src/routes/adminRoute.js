const express = require('express');

const upload = require('../middlewares/upload');
const authenticateAdmin = require('../middlewares/authenticateAdmin');
const adminController = require('../controllers/adminController');

const router = express.Router();

router.get('/editProducts', authenticateAdmin, adminController.getAllProducts);

router.get(
  '/editProducts/getOne/:id',
  authenticateAdmin,
  adminController.getOne
);

router.post(
  '/createProduct',
  authenticateAdmin,
  upload.fields([{ name: 'imageUrl', maxCount: 1 }]),
  adminController.createProduct
);

router.delete('/editProducts/deleteProduct/:id', adminController.deleteProduct);

module.exports = router;
