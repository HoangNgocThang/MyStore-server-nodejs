var express = require('express');
var path = require('path');
var cors = require('cors');

const dbStore = require('./app/db/dbmysql');
const rootRouter = require('./routes');

var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(cors());
dbStore.connect();

rootRouter(app);

module.exports = app;
