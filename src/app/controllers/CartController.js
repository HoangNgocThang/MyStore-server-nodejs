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

    removeItemToCart(req, res) {
        res.send('removeItemInCart');
    }

    increaseItemToCart(req, res) {
        res.send('increaseItemInCart');
    }

    decreaseItemToCart(req, res) {
        res.send('decreaseItemInCart');
    }
}

module.exports = new CartController();