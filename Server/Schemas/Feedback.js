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


const FeedbackModel = mongoose.model("Feedback", FeedbackSchema)
const FeedbackModel2 = mongoose.model("Login",FeedbackLogin)

module.exports = {
    FeedbackModel,
    FeedbackModel2
};