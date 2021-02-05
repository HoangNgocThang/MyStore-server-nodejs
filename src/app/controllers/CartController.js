const Cart = require('../../app/models/Cart');

class CartController {

    addItemToCart(req, res) {
        Cart.addItemToCart(req.body, req.token, (r) => {
            console.log(r);
            res.json(r);
        });
    }

    showCart = (req, res) => {
        Cart.showCart(req.token, (r) => {
            res.json(r);
        });
    }

    increaseItemToCart(req, res) {
        Cart.increaseItemToCart(req.token, req.body, (r) => {
            res.json(r);
        })
    }

    decreaseItemToCart(req, res) {
        Cart.decreaseItemToCart(req.token, req.body, (r) => {
            res.json(r);
        })
    }

    removeItemToCart(req, res) {
        Cart.removeItemToCart(req.token, req.body, (r) => {
            res.json(r);
        })
    }

    getTotalItemInCart(req, res) {
        Cart.getTotalItemInCart(req.token, (r) => {
            res.json(r);
        })
    }
}

module.exports = new CartController();