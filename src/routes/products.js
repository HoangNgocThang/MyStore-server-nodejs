const express = require('express');
const router = express.Router();

const productsController= require('../app/controllers/ProductController');

router.get('/show/:slug', productsController.getProductsBySlug);
router.get('/index', productsController.getProducts);

module.exports = router;