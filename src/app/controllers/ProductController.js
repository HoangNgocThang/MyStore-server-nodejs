const Product = require('../models/Product');

class ProductController {

    async getProductsBySlug(req, res) {
        console.log("Vao1");
        const slug = await req.params.slug;
        const data = await Product.getProductsBySlug(slug);
        res.json({data});
    }

    async getProducts(req, res) {
        console.log("Vao2");
        const data = await Product.getProducts();
        res.json({data});
    }

}

module.exports = new ProductController();