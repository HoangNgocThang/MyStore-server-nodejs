const jwt = require('jsonwebtoken');
const Database = require('../../app/db/dbmysql');
const bcrypt = require('bcrypt');

class Login {

    login(params, callback) {
        console.log(params);
        if (params == null || params == undefined) {
            callback({err: 'Vui lòng nhập đầy đủ thông tin'});
            return;
        }

        if (params.username == '' || params.username == null) {
            callback({err: 'username không được bỏ trống'});
            return;
        }

        if (params.password == '' || params.password == null) {
            callback({err: 'password không được bỏ trống'});
            return;
        }

        Database.connection.query(`select * from user where  username = ?`,[params.username], (er, r) => {
            const resultArray = JSON.parse(JSON.stringify(r));
            if (resultArray.length === 0) {
                callback('username hoặc password không chính xác');
                return;
            }
            console.log("pass lay trong db:", resultArray[0].password);

            if (bcrypt.compareSync(params.password, resultArray[0].password)) {
                console.log('pass dung');
                const token = jwt.sign({username: params.username}, 'mk');
                callback({
                    access_token: token,
                    username: params.username
                })
            } else {
                console.log('pass sai');
                callback({err: 'tên tài khoản hoặc mật khẩu k đúng'})
            }
        })
    }
}

module.exports = new Login();