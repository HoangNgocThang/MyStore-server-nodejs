const Database = require('../../app/db/dbmysql');

class Category {
    getCategory() {
        return new Promise((resolve) => {
            Database.connection.query('SELECT * from CATEGORY', (err, rows) => {
                resolve(rows)
            })
        });
    }
}

module.exports = new Category();