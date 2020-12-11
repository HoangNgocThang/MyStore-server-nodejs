class UserController {

    index(req, res) {
        // res.send('user user');
        res.render('user');
    }
}

module.exports = new UserController();