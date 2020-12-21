const Database = require('../../app/db/dbmysql');

class Product {

    getProducts() {
        return new Promise((resolve) => {
            Database.connection.query('SELECT * from PRODUCT', (err, rows) => {
                if (err) {
                    console.log(err);
                    return;
                }
                resolve(rows);
            })
        });
    }

    getProductsBySlug(slug) {
        console.log("cc:", slug);
        return new Promise((resolve) => {
            Database.connection.query(`select p.* from PRODUCT as p inner join CATEGORY as c on c.id = p.id_category Where slug= ?`,
                [slug], (err, rows) => {
                    console.log(rows);
                    resolve(rows)
                })

            // Database.connection.query(`select id from CATEGORY where CATEGORY.slug = '${slug}' `, (err, rows) => {
            //     if (err) {
            //         console.log(err);
            //         return;
            //     }
            //     var resultArray = Object.values(JSON.parse(JSON.stringify(rows)));
            //     resultArray.forEach(function (v) {
            //         console.log(v);
            //         Database.connection.query(`select * from PRODUCT where id_category = ${v.id}`, (er, r) => {
            //             if (er) {
            //                 console.log(err);
            //                 return;
            //             }
            //             resolve(r);
            //         })
            //     });
            // })

        });
    }
}

module.exports = new Product();