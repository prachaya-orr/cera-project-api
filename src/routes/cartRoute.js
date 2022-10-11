const express = require('express');

const authenticate = require('../middlewares/authenticate');
const cartController = require('../controllers/cartController');

const router = express.Router();

router.post('/cart', authenticate, cartController.createCart);
router.get('/cart', authenticate, cartController.getCart);
// router.patch('/cart', authenticate, cartController.updateQuantity);

module.exports = router;
