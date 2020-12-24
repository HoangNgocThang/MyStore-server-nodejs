const Database = require('../../app/db/dbmysql');
const jwt = require('jsonwebtoken');
const Constant = require('../../../src/constant/index');
const moment = require('moment');

class Order {

    createOrder(param, token, callback) {
        jwt.verify(token, Constant.SIGNATURE_KEY, function (err, decoded) {
            if (err) {
                callback({
                    status: 400,
                    message: err
                });
                return;
            }
            let amount = 0;
            param.data.forEach((e, i) => {
                amount = amount + e.quantity * e.price
            });
            Database.connection.query('INSERT INTO bill (date, id_user, date_bh, amount, amount_origin ) VALUES (?, ?, ?, ?, ?)',
                [
                    moment(param.datetime).add(12, 'month').format('DD/MM/YYYY HH:mm:ss'),
                    decoded.id,
                    moment(param.datetime).add(12, 'month').format('DD/MM/YYYY HH:mm:ss'),
                    amount,
                    amount
                ], (e, r) => {
                    if (e) {
                        callback({
                            status: 400,
                            message: e
                        });
                        return;
                    }
                    console.log("RESSSS:", r);
                    callback({
                        status: 200,
                        message: 'Tạo hóa đơn thành công'
                    })
                    Database.connection.query('Delete from cart where id_user = ?',
                        [decoded.id], (er, re) => {
                            if (er) {
                                callback({
                                    status: 400,
                                    message: er
                                });
                                return;
                            }
                            console.log("Xóa các sản phẩm trong giỏ hàng đi khi user đó đặt hàng thành công", re);
                        });
                });
        });
    }

    getListOrder(param, token, callback) {
        jwt.verify(token, Constant.SIGNATURE_KEY, function (err, decoded) {
            if (err) {
                callback({
                    status: 400,
                    message: err
                });
                return;
            }
            Database.connection.query('Select * from bill where id_user = ?',
                [decoded.id], (e, r) => {
                    if (e) {
                        callback({
                            status: 400,
                            message: r
                        });
                        return;
                    }
                    const resultArray = JSON.parse(JSON.stringify(r));
                    callback({
                        status: 200,
                        data: resultArray
                    })
                });
        });
    }
}

module.exports = new Order();