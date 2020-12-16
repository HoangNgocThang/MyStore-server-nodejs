var express = require('express');
var router = express.Router();
const cartController = require('../app/controllers/CartController');

router.use('/show', cartController.showCart);
router.use('/item/remove', cartController.removeItemInCart);
router.use('/item/increase', cartController.increaseItemInCart);
router.use('/item/decrease', cartController.decreaseItemInCart);

module.exports = router;