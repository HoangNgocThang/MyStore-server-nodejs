const Login = require('../models/Login');

class LoginController {

    login(req, res) {
        // console.log(req.body.username, req.body.password);
        Login.login(req.body, (r) => {
            res.json(r);
        });
    }
}

module.exports = new LoginController();