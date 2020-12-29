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

    //model
    uploadProfile(param, token, req, res, callback) {
        console.log('param:', param);
        jwt.verify(token, Constant.SIGNATURE_KEY, function (err, decoded) {
            if (err) {
                callback({status: 400, message: err});
                return;
            }
            const path =  `/upload/${Date.now()}-${param.avatar.originalname}`
            fs.writeFile('public'+path, param.avatar.buffer, function (err) {
                if (err) {
                    callback({status: 400, message: err});
                    return;
                }
                console.log("The file was saved!");
                Database.connection.query('UPDATE user SET name = ?, address = ?, avatar = ? where id = ?',
                    [
                        param.name,
                        param.address,
                        path,
                        decoded.id
                    ], (e, r) => {
                        if (e) {
                            callback({status: 400, message: e});
                            return;
                        }
                        callback({status: 200, data: param, message: 'Lưu thành công'});
                    }
                );
            });
        });
    }
}

module.exports = new User();