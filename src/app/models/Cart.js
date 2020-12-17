const Database = require('../../app/db/dbmysql');

class Cart {
    addItemToCart(item, callback) {
        Database.connection.query('Select * from Cart', (er, r) => {
            if (er) {
                console.log(er);
                callback("Thêm thất bại: " + er);
                return;
            }
            const resultArray = JSON.parse(JSON.stringify(r));
            if (resultArray.some((e) => e.id == item.id)) {
                console.log('vao day');
                callback("Thêm thành công (k tạo bản ghi)");
                return;
            }

            console.log('item day len tu client:', item);
            Database.connection.query(`INSERT INTO Cart (id_product, id_user, quantity) VALUES (${item.id}, null, 1)`, (err, rows) => {
                if (err) {
                    console.log(err);
                    callback("Thêm thất bại: " + err);
                    return;
                }
                console.log("KQ:", rows);
                callback("Thêm thành công (tạo bản ghi)");
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