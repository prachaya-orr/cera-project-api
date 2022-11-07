const express = require('express');

const paymentController = require('../controllers/paymentController');
const authenticate = require('../middlewares/authenticate');

const router = express.Router();

router.post('/',authenticate, paymentController.createPayment,);

module.exports = router;
