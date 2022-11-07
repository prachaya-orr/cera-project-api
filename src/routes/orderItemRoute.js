const express = require('express');

const authenticate = require('../middlewares/authenticate');
const orderItemController = require('../controllers/orderItemController');

const router = express.Router();

router.post(
  '/',
  authenticate,
  orderItemController.createOrderItem
);



module.exports = router;
