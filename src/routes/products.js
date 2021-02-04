const express = require('express');
const router = express.Router();
const productsController= require('../app/controllers/ProductController');

router.get('/index', productsController.getProducts);
router.get('/show/:slug', productsController.getProductsBySlug);
router.get('/show-detail/:slugCategory/:slugProduct/:idProduct', productsController.getDetailProduct);

module.exports = router;