const express = require('express');

const authenticate = require('../middlewares/authenticate');
const orderController = require('../controllers/orderController');

const router = express.Router();

router.patch(
  '/',
  authenticate,
  orderController.updateStatusOrder
);


module.exports = router;
