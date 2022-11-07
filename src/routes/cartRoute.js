const express = require('express');

const authenticate = require('../middlewares/authenticate');
const cartController = require('../controllers/cartController');

const router = express.Router();

router.post('/cart', authenticate, cartController.createCart);
router.get('/cart', authenticate, cartController.getCart);
router.get('/cart/totalPrice', authenticate, cartController.getTotalPrice);
router.delete('/cart/:cartId',authenticate,cartController.deleteCart)
router.delete('/cart',authenticate,cartController.clearCart)
router.patch('/cart', authenticate, cartController.updateCart);

module.exports = router;
