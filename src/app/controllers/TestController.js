const test = require('../../app/models/Test');
const jwt = require('jsonwebtoken');

class TestController {
    methodTest(req, res) {
        console.log(req.body);
        jwt.verify(req.body.xToken, 'mk', function (err, decoded) {
            if (err) {
                console.log("err:", err);
                res.json({err});
            } else {
                res.json({
                    data: decoded
                });
            }
        });
    }
}

module.exports = new TestController();