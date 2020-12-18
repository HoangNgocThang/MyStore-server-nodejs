const register = require('../../app/models/Register');

class RegisterController {
    addNewUser(req, res) {
        console.log(req.body);
        register.addNewUser(req.body,(r)=> {
            console.log(r);
            res.json(r);
        });
    }
}

module.exports = new RegisterController();