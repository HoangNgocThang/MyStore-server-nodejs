const express = require('express');
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const productRouter = require('./products');
const categoryRouter = require('./category');
const cartRouter = require('./cart');
const loginRouter = require('./login');
const registerRouter = require('./register');
const testRouter = require('./test');

function route(app) {

    /* GET home page. */
    app.get('/', function (req, res, next) {
        res.render('index', {title: 'THANG'});
    });

    app.use('/products', productRouter);
    app.use('/category', categoryRouter);
    app.use('/cart', cartRouter);
    app.use('/api/login', loginRouter);
    app.use('/api/register', registerRouter);
    app.use('/api/test', testRouter);

    app.use(logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded({extended: false}));
    app.use(cookieParser());

    /* catch 404 and forward to error handler */
    app.use(function (req, res, next) {
        next(createError(404));
    });

    /* error handler */
    app.use(function (err, req, res, next) {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};
        // render the error page
        res.status(err.status || 500);
        res.render('error');
    });
}

module.exports = route;
