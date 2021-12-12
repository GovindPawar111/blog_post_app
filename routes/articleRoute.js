const express = require("express");

// include articleModel
const ArticleModel = require("../models/articleModel");

const router = express.Router();

// Get new route
// empty new Article is pass to overcome error which come because of passing article to refilling data in edit route
router.get("/new", (req, res) => {
    res.render("new", { article: new ArticleModel() });
});

// Get id route
router.get("/:id", async (req, res) => {
    const article = await ArticleModel.findById(req.params.id);
    if (article == null) res.redirect("/");
    res.render("show", { article: article });
});

// Get Edit route
router.get("/edit/:id", async (req, res) => {
    const article = await ArticleModel.findById(req.params.id);
    if (article == null) res.redirect("/");
    res.render("edit", { article: article });
});

// post  route for inserting date in to db
router.post("/", async (req, res) => {
    let article = new ArticleModel({
        title: req.body.title,
        description: req.body.description,
        markdown: req.body.markdown,
    });
    try {
        article = await article.save();
        // res.send(`${article.id}`)
        res.redirect(`/blogs/${article.id}`);
    } catch (e) {
        console.log(e);
        res.render("new", { article: article });
    }
});

// put route for update
router.put("/:id", async (req, res) => {
    // console.log(req.body)
    // res.send("hello")
    let article = await ArticleModel.findByIdAndUpdate(
        req.params.id,
        {
            title: req.body.title,
            description: req.body.description,
            markdown: req.body.markdown,
        },
        { runValidators: true }
    );
    try {
        article = await article.save();
        // res.send(`${article.id}`)
        res.redirect(`/blogs/${article.id}`);
    } catch (e) {
        console.log(e);
        res.render("edit", { article: article });
    }
});

// delete route for delete
router.delete("/:id", async (req, res) => {
    await ArticleModel.findByIdAndDelete(req.params.id);
    res.redirect("/");
});

// exporting router module
module.exports = {router};
