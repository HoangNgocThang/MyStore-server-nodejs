const Login = require('../models/Login');

class LoginController {

    login(req, res) {
        Login.login(req.body, (r) => {
            res.json(r);
        });
    }
}

module.exports = new LoginController();