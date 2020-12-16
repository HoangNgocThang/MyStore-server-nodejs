var express = require('express');
var router = express.Router();
const categoryController = require('../app/controllers/CategoryController');

router.use('/', categoryController.getCategory);

module.exports = router;