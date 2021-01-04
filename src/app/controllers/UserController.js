const user = require('../models/User');
const hepler = require('../hepler');
const multer = require('multer');

class UserController {

    showUser(req, res) {
        user.showUser(req.token, (r) => {
            res.json(r);
        });
    }

    uploadProfile(req, res) {
        hepler.upload(req, res, function (err) {
            if (err instanceof multer.MulterError) {
                res.json({
                    status: 400,
                    message: "A Multer error occurred when uploading."
                });
            } else if (err) {
                res.json({
                    status: 400,
                    message: "An unknown error occurred when uploading." + err
                });
            } else {
                console.log("DATA DAY LEN:", req.body);
                const param = {
                    name: req.body.name,
                    phone: req.body.phone,
                    address: req.body.address,
                    avatar: req.file,
                    avatarShow: req.avatarShow
                }
                user.uploadProfile(param, req.token, req, res,(r) => {
                    console.log(r);
                    res.json(r);
                });
            }
        });
    }

}

module.exports = new UserController();