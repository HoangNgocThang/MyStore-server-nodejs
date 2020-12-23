const Order = require('../../app/models/Order');

class OrderController {

    createOrder(req, res) {
        // res.send("createOrder");
        Order.createOrder(req.body, req.token, (r) => {
            console.log(r);
            res.json(r);
        });
    }

    getListOrder(req, res) {
        res.send("getListOrder");
    }
}

module.exports = new OrderController();