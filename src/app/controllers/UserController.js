const user = require('../models/User');

class UserController {
    showUser(req, res) {
        user.showUser(req.token,(r)=> {
            console.log(r);
            res.json(r);
        });
    }
}

module.exports = new UserController();