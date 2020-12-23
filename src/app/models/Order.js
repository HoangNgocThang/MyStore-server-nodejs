const Database = require('../../app/db/dbmysql');
const jwt = require('jsonwebtoken');
const Constant = require('../../../src/constant/index');

class Order {

    createOrder(param, token, callback) {
        console.log("param:", param);
        jwt.verify(token, Constant.SIGNATURE_KEY, function (err, decoded) {
            if (err) {
                callback({
                    status: 400,
                    message: err
                });
                return;
            }
            Database.connection.query('')
        });
    }

    getListOrder() {

    }
}

module.exports = new Order();