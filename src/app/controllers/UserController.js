const User = require('../models/User');

class UserController {

    // getUsers(req, res) {
    //     User.find({}, function (err, users) {
    //         if (err) {
    //             console.log("lỗi:", err);
    //             return;
    //         }
    //         console.log(users);
    //         res.json(users);
    //         // res.render('user', {data: users});
    //     });
    // }

    // getUserDetail(req, res) {
    // User.findOne({uid: '308132303359307'}, function (err, user) {
    //     if (err) {
    //         console.log("lỗi:", err);
    //         return;
    //     }
    //     console.log(user);
    // res.json(user);
    // })
    // }
}

module.exports = new UserController();