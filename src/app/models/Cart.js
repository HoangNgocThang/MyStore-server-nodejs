const Database = require('../../app/db/dbmysql');
const jwt = require('jsonwebtoken');
const Constant = require('../../../src/constant/index');

class Cart {
    addItemToCart(item, token, callback) {
        jwt.verify(token, Constant.SIGNATURE_KEY, function (err, decoded) {
            if (err) {
                res.json({
                    status: 400,
                    message: err
                });
            } else {
                console.log("AA:", decoded);

                Database.connection.query('Select * from Cart where id_user= ?', [decoded.id], (er, r) => {
                    if (er) {
                        console.log(er);
                        callback({
                            status: 400,
                            message: er
                        });
                        return;
                    }

                    const resultArray = JSON.parse(JSON.stringify(r));

                    if (resultArray.some((e) => e.id_product == item.id)) {
                        console.log('vao day');
                        callback({
                            status: 200,
                            message: "Thêm thành công (k tạo bản ghi)"
                        });
                        return;
                    }

                    Database.connection.query(`INSERT INTO Cart (id_product, id_user, quantity) VALUES (?, ?, ?)`,
                        [item.id, decoded.id, 1], (err, rows) => {
                            if (err) {
                                console.log(err);
                                callback({
                                    status: 400,
                                    message: err
                                });
                                return;
                            }
                            console.log("KQ:", rows);
                            callback({
                                status: 200,
                                message: "Thêm thành công (tạo bản ghi)"
                            });
                        });
                });
            }
        });
    }

    showCart(token, callback) {
        console.log("OOO;", token)
        jwt.verify(token, Constant.SIGNATURE_KEY, function (err, decoded) {
            if (err) {
                callback({
                    status: 400,
                    message: err
                });
                return;
            }
            console.log("RES:", decoded);
            Database.connection.query('Select * from Cart as c INNER JOIN Product as p ON c.id_product = p.id where id_user = ?', [decoded.id], (e, r) => {
                if (e) {
                    callback({
                        status: 400,
                        message: e
                    });
                    return;
                }
                const resultArray = JSON.parse(JSON.stringify(r));
                console.log('resultArray:', resultArray);
                callback({
                    status: 200,
                    data: resultArray,
                    message: 'thành công'
                })
            });
        })


    }

    removeItemToCart() {
    }

    increaseItemToCart() {
    }

    decreaseItemToCart() {
    }
}

module.exports = new Cart();