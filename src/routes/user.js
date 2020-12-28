const express = require('express');
const router = express.Router();
const userController = require('../app/controllers/UserController');
const bodyParser = require('body-parser');
const hepler = require('../../src/app/hepler');

// create application/json parser
const jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({extended: false});

router.get('/show', jsonParser, hepler.verifyToken, userController.showUser);

module.exports = router;