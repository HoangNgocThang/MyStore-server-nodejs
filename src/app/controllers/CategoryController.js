const Category = require('../models/Category');

class CategoryController {
    async getCategory(req, res) {
        const data = await Category.getCategory();
        res.json({data})
    }
}

module.exports = new CategoryController();