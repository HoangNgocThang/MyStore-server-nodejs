const bcrypt = require('bcrypt');
const Database = require('../../app/db/dbmysql');

class Register {
    addNewUser(params, callback) {
        if (params.name == "" || params.name == null) {
            callback("name không đc bỏ trống");
            return;
        }

        if (params.phone == "" || params.phone == null) {
            callback("phone không đc bỏ trống");
            return;
        }

        if (params.address == "" || params.address == null) {
            callback("address không đc bỏ trống");
            return;
        }

        if (params.username == "" || params.username == null) {
            callback("username không đc bỏ trống");
            return;
        }

        if (params.password == "" || params.password == null) {
            callback("password không đc bỏ trống");
            return;
        }

        console.log('param', params);
        Database.connection.query(`select * from user where phone = ? OR username = ?`,
            [params.phone, params.username], (er, rw) => {
                if (er) {
                    callback({
                        status: 400,
                        message: 'lỗi'
                    });
                    return;
                }

                const resultArray = JSON.parse(JSON.stringify(rw));
                if (resultArray && resultArray.length > 0) {
                    console.log('vao day');
                    callback({
                        status: 400,
                        message: "Tài khoản này đã tồn tại vui lòng lựa chọn username hoặc phone khác"
                    });
                    return;
                }

                const salt = bcrypt.genSaltSync(10);
                const passwordHash = bcrypt.hashSync(params.password, salt);
                console.log(passwordHash);

                Database.connection.query(`INSERT INTO user (name, phone, address, username ,password, avatar, type) VALUES (?, ?, ?, ?, ?, ?, ?);`,
                    [params.name, params.phone, params.address, params.username, passwordHash, null, null], (err, rows) => {
                        if (err) {
                            callback("lỗi: " + err);
                            return;
                        }
                        console.log(rows);
                        callback({
                            status: 200,
                            message: 'Đăng kí thành công !!!'
                        });
                    })

            });

    }
}

module.exports = new Register();