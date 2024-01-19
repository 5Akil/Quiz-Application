const { Schema, model, default: mongoose } = require("mongoose");

const questionSchema = new Schema({
    question: { type: String, required: true, },
    options: { type: Object, required: true, },
    answer: { type: String, required: true, },
    marks: { type: Number, required: true, },
    catagory_id: { type: String, required: true }
})

module.exports = model("questions", questionSchema, "questions");
