const Order = require('../../app/models/Order');

class OrderController {

    createOrder(req, res) {
        console.log(req.body, req.token);
        Order.createOrder(req.body, req.token, (r) => {
            console.log(r);
            res.json(r);
        });
    }

    getListOrder(req, res) {
        console.log(req.body, res.token);
        Order.getListOrder(req.body, req.token, (r) => {
            console.log(r);
            res.json(r);
        });
    }
}

module.exports = new OrderController();