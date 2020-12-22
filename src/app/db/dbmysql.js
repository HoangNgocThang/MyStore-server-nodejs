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



// const mongoose = require('mongoose');
//
// async function connectDb() {
//     try {
//         await mongoose.connect('mongodb+srv://taikhoan1:taikhoan1@cluster0.5mcgg.gcp.mongodb.net/test?retryWrites=true&w=majority',
//             {useNewUrlParser: true, useUnifiedTopology: true});
//         console.log("Kết nối db mongo thành công !!!");
//     } catch (e) {
//         console.log("Kết nối db mongo thất bại", e);
//     }
// }
//
// module.exports = {
//     connectDb
// };