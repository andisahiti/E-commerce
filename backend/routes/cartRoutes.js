const express = require('express');
const checkAuth = require('../middleware/auth');
const cartController = require('../controllers/cart-controller');



const router = express.Router();

router.use(checkAuth);


router.post('/addToCart', cartController.addToCart);
router.post('/getCart', cartController.getCart);
router.post('/removeFromCart', cartController.removeItem)


module.exports = router;