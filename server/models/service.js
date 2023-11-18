const mongoose = require('mongoose');
const path = require('path')
const serviceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    img: {
        type: String,
        required: true
    }
});

const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;
