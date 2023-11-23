const Appointment = require('../models/review')
const ApiError = require('../error/ApiError')
const Review = require("../models/review");

class ReviewController {
    async create(req, res, next) {
        try {
            const {user, rating, comment} = req.body
            const review = new Review({
                user,
                rating,
                comment
            })
            await review.save()
            return res.status(201).json({message: 'Review created successfully', review})
        } catch (e) {
            return next(ApiError.internal(e.message))
        }
    }

    async getAll(req, res, next) {
        try {
            const reviews = await Review.find({})
            return res.json(reviews)
        }
        catch(e) {
            return next(ApiError.internal(e.message))
        }
    }
}

module.exports = new ReviewController()