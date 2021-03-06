const Database = require('../../app/db/dbmysql');
const jwt = require('jsonwebtoken');
const Constant = require('../../../src/constant/index');
const fs = require('fs');
const {v4: uuid_v4} = require('uuid');

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
        console.log('param:', param);
        jwt.verify(token, Constant.SIGNATURE_KEY, function (err, decoded) {
            if (err) {
                callback({status: 400, message: err});
                return;
            }

            if (param.name == null || param.name == '') {
                callback({status: 400, message: 'name không được để trống'});
                return;
            }

            if (param.phone == null || param.phone == '') {
                callback({status: 400, message: 'phone không được để trống'});
                return;
            }

            if (param.address == null || param.address == '') {
                callback({status: 400, message: 'address không được để trống'});
                return;
            }

            if (param.avatar == null && param.avatarShow != '') {
                Database.connection.query('Select avatar from user where id =?',
                    [decoded.id], (e, r) => {

                        if (e) {
                            callback({status: 400, message: e});
                            return;
                        }
                        const result = JSON.parse(JSON.stringify(r));
                        Database.connection.query('UPDATE user SET name = ?, address = ? where id = ?',
                            [
                                param.name,
                                param.address,
                                decoded.id
                            ], (e2, r2) => {
                                if (e2) {
                                    callback({status: 400, message: e2});
                                    return;
                                }
                                callback({
                                    status: 200, data: {
                                        ...param,
                                        linkAvatar: result[0].avatar
                                    }, message: 'Lưu thành công'
                                });
                            }
                        );
                    });
                return;
            }

            console.log("bbb");

            const path = `/upload/${Date.now()}-${uuid_v4()}${param.avatar.mimetype.replace('image/', '.')}`;

            fs.writeFile('public' + path, param.avatar.buffer, function (err) {
                if (err) {
                    callback({status: 400, message: err});
                    return;
                }
                console.log("Write File ok");
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
                        callback({
                            status: 200, data: {
                                ...param,
                                linkAvatar: path
                            }, message: 'Lưu thành công'
                        });
                    }
                );
            });

        });
    }
}

module.exports = new User();