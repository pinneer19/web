const mongoose = require('mongoose')

const userSchema   = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxlength: 255,
        minLength: 2
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxlength: 255,
        minLength: 2
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    phoneNumber: {
        type: String,
        required: true,
        maxLength: 20,
        minLength: 5,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minLength: 7,
        maxLength: 100
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;