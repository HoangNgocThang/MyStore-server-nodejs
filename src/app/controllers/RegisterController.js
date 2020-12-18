const Register = require('../../app/models/Register');

class RegisterController {
    addNewUser(req, res) {

        res.send('addNewUser');
    }
}

module.exports = new RegisterController();