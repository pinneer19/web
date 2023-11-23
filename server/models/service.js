const mongoose = require('mongoose');
const { format } = require('date-fns');
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
}, {
    timestamps: {currentTime: () => new Date()},
    toJSON: {
        transform(doc, ret) {
            ret.updatedAt = format(ret.updatedAt, 'yyyy-MM-dd HH:mm:ss');
            ret.createdAt = format(ret.createdAt, 'yyyy-MM-dd HH:mm:ss');
            return ret;
        },
    }
});

const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;
