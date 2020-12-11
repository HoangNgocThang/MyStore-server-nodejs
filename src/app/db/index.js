// var mysql = require('mysql');
// var connection;
//
// async function connectDb() {
//     try {
//         connection = mysql.createConnection({
//             host: 'localhost',
//             user: 'root',
//             password: '',
//             database: 'news_addiction'
//         });
//         console.log("Kết nối database thành công !!!");
//     } catch (e) {
//         console.log('Lỗi kết nối database:', e);
//     }
// }
//
// async function disConnectDb() {
//     if (connection) {
//         try {
//             connection.end();
//         } catch (e) {
//             console.log("Lỗi hủy kết nối database:", e);
//         }
//     }
// }
//
// module.exports = {
//     connectDb,
//     disConnectDb
// };

class Database {
    mysql = require('mysql');
    connection;

    constructor() {

    }

    connect() {
        try {
            this.connection = this.mysql.createConnection({
                host: 'localhost',
                user: 'root',
                password: '',
                database: 'news_addiction'
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
