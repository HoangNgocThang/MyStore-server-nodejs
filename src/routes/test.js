const express = require('express');
const router = express.Router();
const testController = require('../app/controllers/TestController');
const bodyParser = require('body-parser');
const hepler = require('../app/hepler');

// create application/json parser
const jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({extended: false});

router.post('/index', jsonParser, hepler.verifyToken, testController.methodTest);
module.exports = router;