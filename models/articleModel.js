const mongoose = require("mongoose");

// including marked function form marked liberay
const { marked } = require("marked");

// including dompurify 
const createDomPurify = require("dompurify");

// inclusing JSDOM function form jsdom liberay
const { JSDOM } = require("jsdom");

const dompurify = createDomPurify(new JSDOM().window);

// creating schema 
const articleSchema = new mongoose.Schema({
    title: {
        required: true,
        type: String,
    },
    description: {
        type: String,
    },
    markdown: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    sanitizedHtml: {
        type: String,
        required: true,
    },
});

// mangoose middleware to convert markdown into html before storing into db
articleSchema.pre("validate", function (next) {
    if (this.markdown) {
        this.sanitizedHtml = dompurify.sanitize(marked(this.markdown));
    }

    next();
});

// exporting model
const articleModel= mongoose.model("Article", articleSchema);
module.exports = articleModel;