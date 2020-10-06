const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: true
    },
    country: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    school: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    field: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        min: 6
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}); 


module.exports = mongoose.model("User", userSchema);