const user = require('../models/User');

var multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/upload')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname)
    }
});

var upload = multer({
    // storage: storage,
    fileFilter: function (req, file, cb) {
        console.log(file);
        if (file.mimetype == "image/bmp" || file.mimetype == "image/png") {
            cb(null, true)
        } else {
            return cb(new Error('Only image are allowed!'))
        }
    }
}).single("avatar");

class UserController {
    showUser(req, res) {
        user.showUser(req.token, (r) => {
            res.json(r);
        });
    }

    uploadProfile(req, res) {

        upload(req, res, function (err) {
            if (err instanceof multer.MulterError) {
                console.log("A Multer error occurred when uploading.");
            } else if (err) {
                console.log("An unknown error occurred when uploading." + err);
            } else {
                console.log("DATA DAY LEN:", req.body)

                const param = {
                    name: req.body.name,
                    phone: req.body.phone,
                    address: req.body.address,
                    avatar: req.file
                }

                user.uploadProfile(param, req.token, (r) => {
                    console.log(r);
                    res.json(r);
                });
            }
        });

    }
}

module.exports = new UserController();