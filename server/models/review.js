const mongoose = require('mongoose');
const {format} = require("date-fns");

const reviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    rating: {
        type: Number,
        required: true,
        max: 5,
        min: 1
    },
    comment: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
    toJSON: {
        transform(doc, ret) {
            ret.updatedAt = format(ret.updatedAt, 'yyyy-MM-dd HH:mm:ss');
            ret.createdAt = format(ret.createdAt, 'yyyy-MM-dd HH:mm:ss');
            return ret;
        },
    }
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;