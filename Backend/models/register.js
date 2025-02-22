const mongoose = require("mongoose");

const User = mongoose.model('user', new mongoose.Schema({
    username: {
        type: String,
        required: true,
        lowercase: true,
        minlength: 3,
        maxlength: 200,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        // match: [/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$.!%*?&]{8,}$/, 'Password must be at least 8 characters long and include at least one letter and one number']
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, "Please enter a valid email"]
    }
}))

exports.User = User;