const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
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
    specialization: {
        type: String,
        ref: 'Specialization',
        required: true,
        trim: true,
        maxLength: 255
    }
});

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;
