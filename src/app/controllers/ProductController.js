const Product = require('../models/Product');

class ProductController {

    async getProductsBySlug(req, res) {
        const slug = await req.params.slug;
        const data = await Product.getProductsBySlug(slug);
        res.json({data});
    }

    async getProducts(req, res) {
        const data = await Product.getProducts();
        res.json({data});
    }

}

module.exports = new ProductController();