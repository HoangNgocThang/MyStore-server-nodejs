class CartController {
    showCart(req, res) {
        res.send("show cart");
    }

    removeItemInCart(req, res) {
        res.send('removeItemInCart');
    }

    increaseItemInCart(req, res) {
        res.send('increaseItemInCart');
    }

    decreaseItemInCart(req, res) {
        res.send('decreaseItemInCart');
    }
}

module.exports = new CartController();