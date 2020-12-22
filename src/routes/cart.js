const express = require('express');
const router = express.Router();
const cartController = require('../app/controllers/CartController');
const bodyParser = require('body-parser');
const hepler = require('../../src/app/hepler');

// create application/json parser
const jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({extended: false});

router.post('/show', jsonParser, hepler.verifyToken, cartController.showCart);
router.post('/item/add', jsonParser, hepler.verifyToken, cartController.addItemToCart);
router.post('/item/increase', jsonParser, hepler.verifyToken, cartController.increaseItemToCart);
router.post('/item/decrease', jsonParser, hepler.verifyToken, cartController.decreaseItemToCart);
router.post('/item/remove', jsonParser, hepler.verifyToken, cartController.removeItemToCart);

module.exports = router;