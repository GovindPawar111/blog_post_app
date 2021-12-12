// including env file and config
const dotenv = require('dotenv');
dotenv.config();

// include express
const express = require("express");

// include mongoose
const mongoose = require("mongoose");

// include articleRoute file from routes
const articleRouter = require("./routes/articleRoute");

// include articleModel file from models
const ArticleModel = require("./models/articleModel");

// include method override library
const methodOverride = require("method-override");

const app = express();

// connecting to mogodb through mongoose  localdatabess = mongodb://localhost:27017/blog
mongoose
    .connect( process.env.DB_URL || "mongodb://localhost:27017/blog"  )
    .then(() => {
        console.log("connected to mongo");
    })
    .catch(() => {
        console.log("not connected");
    });

// set view engine to ejs to inclue javascript in to html
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

// Get main route
app.get("/", async (req, res) => {
    const articles = await ArticleModel.find().sort({
        createdAt: "desc",
    });
    res.render("index", { articles: articles });
}); 

app.use("/blogs", articleRouter);

app.listen(process.env.PORT || 3000, () => {
    console.log("listening on port 3000");
});
