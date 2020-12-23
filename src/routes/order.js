const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const orderController = require('../app/controllers/OrderController');
const hepler = require('../../src/app/hepler');

// create application/json parser
const jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({extended: false});

router.post('/create', jsonParser, hepler.verifyToken, orderController.createOrder);
router.get('/show', jsonParser, hepler.verifyToken, orderController.getListOrder);

module.exports = router;