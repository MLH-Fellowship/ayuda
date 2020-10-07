const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    topics: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Topic"
        },
    ],
    questions: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Question"
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }
}); 


module.exports = mongoose.model("Subject", subjectSchema);