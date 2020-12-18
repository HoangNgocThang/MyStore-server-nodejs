const express = require('express');
const router = express.Router();
const testController = require('../app/controllers/TestController');
const bodyParser = require('body-parser');

// create application/json parser
const jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({extended: false});

// function eToken(req, res, next) {
//     const bHeader = req.header["authorization"];
//     if (typeof bHeader !== 'undefined') {
//         const bearer = bHeader.split(" ");
//         const bearerToken = bearer[1];
//         console.log('vao dayyyyyy')
//         req.token = bearerToken;
//         next();
//     } else {
//         res.sendStatus(403);
//     }
// }

router.post('/index', jsonParser, testController.methodTest)
module.exports = router;