const Database = require('../db');

class Post {

    getPost() {
        return new Promise((resolve) => {
            Database.connection.query('SELECT * from POSTS limit 5', (err, rows) => {
                resolve(rows)
            })
        });
    }

    async getPost2(callback) {
        Database.connection.query('SELECT * from POSTS limit 5', (e, r) => callback(r));
    }

}

module.exports = new Post();


