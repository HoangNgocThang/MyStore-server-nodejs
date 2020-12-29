const Database = require('../../app/db/dbmysql');
const jwt = require('jsonwebtoken');
const Constant = require('../../../src/constant/index');
const fs = require('fs');

class User {
    showUser(token, callback) {
        jwt.verify(token, Constant.SIGNATURE_KEY, function (err, decoded) {
            if (err) {
                callback({
                    status: 400,
                    message: err
                });
                return;
            }
            Database.connection.query('Select address, avatar, id, name, phone, type, username from user where id = ?',
                [decoded.id], (e, r) => {
                    if (e) {
                        callback({
                            status: 400,
                            message: e
                        });
                        return;
                    }
                    const result = JSON.parse(JSON.stringify(r));
                    callback({
                        status: 200,
                        message: 'ok',
                        data: result[0]
                    })
                });
        });
    }


    uploadProfile(param, token, req, res, callback) {

        jwt.verify(token, Constant.SIGNATURE_KEY, function (err, decoded) {
            if (err) {
                callback({
                    status: 400,
                    message: err
                });
                return;
            }
            console.log(decoded);
            console.log('param:', param.avatar);

            fs.writeFile("public/upload", param.avatar.buffer, function (err) {
                if (err) {
                    console.log("loi:", err);
                    callback({
                        status: 400,
                        message: err
                    });
                    return;
                }
                callback({
                    status: 200,
                    data: param
                });
                console.log("The file was saved!");
            });
        });
    }
}

module.exports = new User();