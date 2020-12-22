const Cart = require('../../app/models/Cart');

class CartController {

    addItemToCart(req, res) {
        console.log("Param:", req.body);
        console.log("GGG:", req.token);
        Cart.addItemToCart(req.body, req.token, (r) => {
            console.log(r);
            res.json(r);
        });
    }

    showCart = (req, res) => {
        console.log("vao day11:", req.token)
        Cart.showCart(req.token, (r) => {
            console.log('rrr', r);
            res.json(r);
        });
    }

    increaseItemToCart(req, res) {
        console.log("vao day22:", req.token);
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
        res.send('removeItemInCart');
    }
}

module.exports = new CartController();