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

    getDetailProduct(req, res) {
        Product.getDetailProduct(req.params, (r) => {
            console.log("getDetailProduct:", req, res)
            res.json(r);
        })
    }

}

module.exports = new ProductController();