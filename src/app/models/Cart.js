const Database = require('../../app/db/dbmysql');

class Cart {
    addItemToCart(item, callback) {
        Database.connection.query('Select * from Cart', (er, r) => {
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

            console.log('item day len tu client:', item);
            Database.connection.query(`INSERT INTO Cart (id_product, id_user, quantity) VALUES (?, ?, ?)`,
                [item.id, null, 1], (err, rows) => {
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
                })
        });

    }

    showCart() {
        Database.connection.query('Select * from Cart', (er, r) => {

        });
    }

    removeItemToCart() {
    }

    increaseItemToCart() {
    }

    decreaseItemToCart() {
    }
}

module.exports = new Cart();