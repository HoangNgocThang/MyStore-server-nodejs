const Post = require('../models/Post');

class NewsController {

    // [GET] /news
    // async index(req, res) {
    //     const data = await Post.getPost();
    //     console.log(data);
    //     // res.json(data);
    //     res.render("news", {"data": data})
    //
    //     // Post.getPost2(r=>{
    //     //     res.json(r)
    //     // });
    // }

    // [GET] /news/:slug
    // show(req, res) {
    //     res.send("New Detail");
    // }
}

module.exports = new NewsController();
