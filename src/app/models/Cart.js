const Database = require('../../app/db/dbmysql');
const jwt = require('jsonwebtoken');
const Constant = require('../../../src/constant/index');

class Cart {
    addItemToCart(item, token, callback) {
        jwt.verify(token, Constant.SIGNATURE_KEY, function (err, decoded) {
            if (err) {
                callback({
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
            Database.connection.query('Select * from Cart as c INNER JOIN Product as p ON c.id_product = p.id where id_user = ? and id_order IS null ',
                [decoded.id], (e, r) => {
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

    increaseItemToCart(token, item, callback) {
        console.log("token increaseItemToCart;", token, item)
        jwt.verify(token, Constant.SIGNATURE_KEY, function (err, decoded) {
            if (err) {
                callback({
                    status: 400,
                    message: err
                });
                return;
            }
            console.log(decoded)
            Database.connection.query('UPDATE  Cart as c SET quantity = ?  where c.id_user= ? And c.id_product = ? ',
                [item.quantity + 1, decoded.id, item.id_product], (e, r) => {
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

    decreaseItemToCart(token, item, callback) {
        console.log("token increaseItemToCart;", token, item)
        jwt.verify(token, Constant.SIGNATURE_KEY, function (err, decoded) {
            if (err) {
                callback({
                    status: 400,
                    message: err
                });
                return;
            }
            console.log(decoded)
            var reMinus = item.quantity - 1;
            if (reMinus <= 0) {
                callback({
                    status: 400,
                    message: 'Số lương không bé hơn bằng 0'
                });
                return;
            }
            Database.connection.query('UPDATE  Cart as c SET quantity = ?  where c.id_user= ? And c.id_product = ? ',
                [reMinus, decoded.id, item.id_product], (e, r) => {
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

    removeItemToCart(token, item, callback) {
        jwt.verify(token, Constant.SIGNATURE_KEY, function (err, decoded) {
            if (err) {
                callback({
                    status: 400,
                    message: err
                });
                return;
            }
            Database.connection.query(' DELETE FROM cart where id_user = ? And id_product = ? ',
                [decoded.id, item.id_product], (e, r) => {
                    if (e) {
                        callback({
                            status: 400,
                            message: err
                        })
                        return;
                    }
                    callback({
                        status: 200,
                        message: 'thành công'
                    })
                });
        });
    }

    getTotalItemInCart(token, callback) {
        jwt.verify(token, Constant.SIGNATURE_KEY, function (err, decoded) {
            if (err) {
                callback({
                    status: 400,
                    message: err
                });
                return;
            }
            Database.connection.query('Select * from cart where id_user = ? and id_order Is null ',
                [decoded.id], (e, r) => {
                    if (e) {
                        callback({
                            status: 400,
                            message: err
                        })
                        return;
                    }
                    const resultArray = JSON.parse(JSON.stringify(r));
                    callback({
                        status: 200,
                        message: 'thành công',
                        total: resultArray.length
                    })
                })
        });
    }
}

module.exports = new Cart();