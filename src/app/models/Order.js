const Database = require('../../app/db/dbmysql');
const jwt = require('jsonwebtoken');
const Constant = require('../../../src/constant/index');
const moment = require('moment');

class Order {

    createOrder(param, token, callback) {
        if (param && param.data.length === 0) {
            callback({
                status: 400,
                message: 'Bạn cần có sản phẩm trong giỏ hàng'
            });
            return;
        }
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

                    const result = JSON.parse(JSON.stringify(r));

                    console.log("id_order:", result.insertId);

                    // Database.connection.query('UPDATE cart SET id_order = ? where id_user = ? and id_order is null ',
                    //     [result.insertId, decoded.id], (er, re) => {
                    //         if (er) {
                    //             callback({
                    //                 status: 400,
                    //                 message: er
                    //             });
                    //             return;
                    //         }
                    //         console.log("Đánh dấu sản phẩm đã thành đơn trong giỏ hàng", re);
                    //     });

                    Database.connection.query('DELETE from cart  where id_user = ?',
                        [decoded.id], (er, re) => {
                            if (er) {
                                callback({
                                    status: 400,
                                    message: er
                                });
                                return;
                            }
                            callback({
                                status: 200,
                                message: 'Tạo hóa đơn thành công'
                            })
                            console.log("Xóa sản phẩm đã thành đơn trong giỏ hàng", re);
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
            Database.connection.query('select * from cart as c INNER JOIN product as p ON c.id_product= p.id  where id_user = ? and id_order Is NOT null',
                [decoded.id], (er, re) => {
                    if (er) {
                        callback({
                            status: 400,
                            message: er
                        });
                        return;
                    }
                    const resultArrayCart = JSON.parse(JSON.stringify(re));

                    Database.connection.query('Select * from bill where id_user = ? ',
                        [decoded.id], (e, r) => {
                            if (e) {
                                callback({
                                    status: 400,
                                    message: r
                                });
                                return;
                            }
                            const resultArray = JSON.parse(JSON.stringify(r));
                            console.log('resultArray:', resultArray);

                            callback({
                                status: 200,
                                data: resultArray.map(ele => {
                                    return {...ele, items: resultArrayCart}
                                })
                            });
                        });
                });

        });
    }

    getTotalOrder(token, callback) {
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
                    console.log("VVVV:", r);
                    const resultArrayBill = JSON.parse(JSON.stringify(r));
                    callback({
                        status: 200,
                        message: resultArrayBill,
                        total: resultArrayBill.length
                    });
                });
        });
    }
}

module.exports = new Order();