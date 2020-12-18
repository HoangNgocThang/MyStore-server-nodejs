const express = require('express');
const router = express.Router();
const registerController = require('../app/controllers/RegisterController');
const bodyParser = require('body-parser');

// create application/json parser
const jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({extended: false});

router.post('/', jsonParser, registerController.addNewUser);

module.exports = router;