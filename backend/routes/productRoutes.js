const express = require('express');
const productController = require('../controllers/product-controller');
const { check } = require('express-validator');
const checkAuth = require('../middleware/auth');
const Product = require('../models/product');
const router = express.Router();



router.post("/getProducts", productController.getProducts);

router.post("/getItems", productController.getItems);

router.use(checkAuth);

router.post("/uploadImage", productController.uploadFiles);
router.post("/uploadProduct", [
    check('title')
        .not()
        .isEmpty(),
    check('description')
        .not()
        .isEmpty()
], productController.addProduct);


module.exports = router;


