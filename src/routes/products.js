var express = require('express');
var router = express.Router();

const productsController= require('../app/controllers/ProductController');

router.use('/show/:slug', productsController.getProductsBySlug);
router.use('/index', productsController.getProducts);

module.exports = router;