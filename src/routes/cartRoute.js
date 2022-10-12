const express = require('express');

const authenticate = require('../middlewares/authenticate');
const cartController = require('../controllers/cartController');

const router = express.Router();

router.post('/cart', authenticate, cartController.createCart);
router.get('/cart', authenticate, cartController.getCart);
// router.patch('/cart', authenticate, cartController.updateQuantity);
router.delete('/cart/:cartId',authenticate,cartController.deleteCart)

module.exports = router;
