const Post = require('../models/Post');

class NewsController {

    // [GET] /news
    async index(req, res) {
        console.log({data});
        const data = await Post.getPost();
        res.json(data);
        // Post.getPost2(r=>{
        //     res.json(r)
        // });
    }

    // [GET] /news/:slug
    show(req, res) {
        res.send("New Detail");
    }
}

module.exports = new NewsController;
