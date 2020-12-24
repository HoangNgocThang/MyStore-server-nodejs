const Database = require('../../app/db/dbmysql');
const jwt = require('jsonwebtoken');
const Constant = require('../../../src/constant/index');
const moment = require('moment');

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

            var amount = 0;
            param.data.forEach((e, i) => {
                amount = amount + e.quantity * e.price
            });
            console.log("amount:", amount);

            console.log("DAAATE:", moment(param.datetime).add(12, 'month').format('DD/MM/YYYY'))
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

    getListOrder() {

    }
}

module.exports = new Order();