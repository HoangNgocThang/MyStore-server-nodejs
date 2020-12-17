const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const loginController= require('../app/controllers/LoginController');

// create application/json parser
const jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false });

router.post('/', jsonParser,loginController.login);

module.exports= router;