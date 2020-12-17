const express = require('express');
const router = express.Router();
const cartController = require('../app/controllers/CartController');
const bodyParser = require('body-parser');

// create application/json parser
const jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false });

router.post('/item/add',jsonParser,cartController.addItemToCart);
router.post('/show', jsonParser,cartController.showCart);
router.post('/item/remove',jsonParser, cartController.removeItemToCart);
router.post('/item/increase',jsonParser, cartController.increaseItemToCart);
router.post('/item/decrease',jsonParser, cartController.decreaseItemToCart);

module.exports = router;