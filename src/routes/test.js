const express = require('express');
const router = express.Router();
const testController = require('../app/controllers/TestController');
const bodyParser = require('body-parser');

// create application/json parser
const jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({extended: false});

function verifyToken(req, res, next) {
    console.log("vao verifyToken")
    // Get auth header value
    const bearerHeader = req.headers['authorization'];
    // Check if bearer is undefined
    if (typeof bearerHeader !== 'undefined') {
        // Split at the space
        const bearer = bearerHeader.split(' ');
        // Get token from array
        const bearerToken = bearer[1];
        // Set the token
        req.token = bearerToken;
        // Next middleware
        console.log("vao verifyToken2:", req.token)

        next();
    } else {
        // Forbidden
        res.sendStatus(403);
    }
}

router.post('/index', jsonParser, verifyToken, testController.methodTest);
module.exports = router;