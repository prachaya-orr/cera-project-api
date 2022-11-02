const express = require('express');

const authenticate = require('../middlewares/authenticate');
const orderController = require('../controllers/orderController');

const router = express.Router();

router.post(
  '/',
  authenticate,
  orderController.createOrder
);

module.exports = router;
