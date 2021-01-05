const express = require('express');
const router = express.Router();

const productsController= require('../app/controllers/ProductController');

router.get('/show/:slug', productsController.getProductsBySlug);
router.get('/index', productsController.getProducts);
//router.get('/:slug-category/:slug-product', productsController.getDetailProduct);

module.exports = router;