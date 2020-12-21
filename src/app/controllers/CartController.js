const Cart = require('../../app/models/Cart');

class CartController {

    addItemToCart(req, res) {
        console.log("Param:", req.body);
        console.log("GGG:", req.token);
        Cart.addItemToCart(req.body, (r) => {
            console.log(r);
            res.json(r);
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