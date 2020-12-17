const Cart = require('../../app/models/Cart');

class CartController {

    addItemToCart(req, res) {
        console.log("Param:", req.body);
        Cart.addItemToCart(req.body, (r) => {
            res.json(r)
        });
    }

    showCart(req, res) {
        res.send("show cart");
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