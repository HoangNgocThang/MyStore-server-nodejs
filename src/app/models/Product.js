const Database = require('../../app/db/dbmysql');

class Product {

    getProducts() {
        return new Promise((resolve) => {
            Database.connection.query('SELECT p.id, p.name, p.price, p.discount_price, p.id_promotion, p.image, p.id_category, p.slug, c.name as name_category, c.slug as slug_category from PRODUCT as p INNER JOIN Category as c on p.id_category=c.id',
                (err, rows) => {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    resolve(rows);
                })
        });
    }

    getProductsBySlug(slug) {
        return new Promise((resolve) => {
            Database.connection.query(`select p.id, p.name, p.price, p.discount_price, p.id_promotion, p.image, p.id_category, p.slug, c.name as name_category, c.slug as slug_category from PRODUCT as p inner join CATEGORY as c on c.id = p.id_category Where c.slug= ?`,
                [slug], (err, rows) => {
                    console.log(rows);
                    resolve(rows)
                })
        });
    }

    getDetailProduct(params, callback) {
        if (params.idProduct == null || params.idProduct == undefined) {
            callback({
                status: 400,
                message: 'Thiếu idProduct'
            });
        }
        Database.connection.query(`select * from product where id= ?`, [params.idProduct], (err, rows) => {
            if (err) {
                callback({
                    status: 400,
                    message: err
                });
                return;
            }
            const resultArray = JSON.parse(JSON.stringify(rows));
            callback({
                status: 200,
                data: resultArray[0]
            })
            console.log(resultArray)
        })
    }
}

module.exports = new Product();