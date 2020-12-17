// const Login = require('../models/Login');
const jwt = require('jsonwebtoken');

class LoginController {

    login(req, res) {
        console.log(req.body.username, req.body.password);
        try {
            if (req.body.username === "thang" && req.body.password === '123456') {
                const token = jwt.sign({username: req.body.username, password: req.body.password}, 'mk');
                return res.json({
                    access_token: token,
                    username: req.body.username
                })
            }
            res.json({err: 'tên tài khoản hoặc mật khẩu k đúng'});
        } catch (e) {
            res.json({err: e})
        }
    }
}

module.exports = new LoginController();