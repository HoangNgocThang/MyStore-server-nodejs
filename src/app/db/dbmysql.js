const mysql = require('mysql');

class Database {
    mysql = require('mysql');
    connection;

    connect() {
        try {
            this.connection = this.mysql.createConnection({
                host: 'localhost',
                user: 'root',
                password: '',
                database: 'test'
            });
            console.log("Kết nối database thành công !!!");
        } catch (e) {
            console.log('Lỗi kết nối database:', e);
        }
    }

    disConect() {
        this.connection.end(() => {
            console.log("Hủy kết nối database !!!");
        });
    }

}

module.exports = new Database();