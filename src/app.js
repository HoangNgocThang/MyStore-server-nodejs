const express = require('express');
const path = require('path');
const cors = require('cors'); // lib này cho vào để chạy đc localhost

const dbStore = require('./app/db/dbmysql');
const rootRouter = require('./routes');

const app = express();
app.use(express.static('public'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(cors());
dbStore.connect();

rootRouter(app);

module.exports = app;
