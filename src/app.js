var express = require('express');
var path = require('path');
const Database = require('./app/db');
const rootRouter = require('./routes');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

Database.connect();

rootRouter(app);

module.exports = app;
