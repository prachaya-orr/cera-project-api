const express = require('express');

const authenticate = require('../middlewares/authenticate');
const cartController = require('../controllers/cartController');

const router = express.Router();

router.post('/', authenticate, cartController.createCart);
router.delete('/deleteCart/:cartId', authenticate, cartController.deleteCart);
router.get('/getCart', authenticate, cartController.getCart);
// router.patch('/updateQuantity', authenticate, cartController.updateQuantity);

module.exports = router;
