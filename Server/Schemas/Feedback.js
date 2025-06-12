const mongoose = require('mongoose')

const FeedbackSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        min:1,
        max:5,
    },
    date: {
        type: Date,
        default: Date.now(),
    },
})

const FeedbackLogin = new mongoose.Schema({
    name: String,
    email: String,
    password : String,
    role: { type: String, default: "user" } // or "admin" 
})

const ProductsSchema = new mongoose.Schema({
    name: String,

    price: {
        type: Number,
        min:1,
    },

    size: {
        type: Number,
        min:1,
    },

    description: String,

    stock: {
        type: Number,
        min:0,
    },

    images: {
        data: Buffer,
        contentType: String
    }
});

const FeedbackModel = mongoose.model("Feedback", FeedbackSchema)
const FeedbackModel2 = mongoose.model("Login",FeedbackLogin)
const ProductsData = mongoose.model("Products", ProductsSchema)

module.exports = {
    FeedbackModel,
    FeedbackModel2,
    ProductsData
};