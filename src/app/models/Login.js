const jwt = require('jsonwebtoken');
const Database = require('../../app/db/dbmysql');
const bcrypt = require('bcrypt');
const Constant = require('../../../src/constant/index');

class Login {

    login(params, callback) {
        console.log(params);
        if (params == null || params == undefined) {
            callback({
                status: 400,
                err: 'Vui lòng nhập đầy đủ thông tin'
            });
            return;
        }

        if (params.username == '' || params.username == null) {
            callback({
                status: 400,
                err: 'username không được bỏ trống'
            });
            return;
        }

        if (params.password == '' || params.password == null) {
            callback({
                status: 400,
                err: 'password không được bỏ trống'
            });
            return;
        }

        Database.connection.query(`select * from user where  username = ?`, [params.username], (er, r) => {
            const resultArray = JSON.parse(JSON.stringify(r));
            if (resultArray.length === 0) {
                callback({
                    status: 400,
                    err: 'username hoặc password không chính xác'
                });
                return;
            }
            console.log("pass lay trong db:", resultArray[0].password);

            if (bcrypt.compareSync(params.password, resultArray[0].password)) {
                console.log('pass dung');

                const token = jwt.sign({
                    id: resultArray[0].id,
                    username: params.username
                }, Constant.SIGNATURE_KEY);

                callback({
                    status: 200,
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