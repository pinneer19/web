const Service = require('../models/service')
const ApiError = require('../error/ApiError')
const mongoose = require("mongoose");
const uuid = require('uuid')
const path = require('path')
const Doctor = require("../models/doctor");

class ServiceController {
    async create(req, res, next) {
        try {
            const {name, description, doctor, price} = req.body
            const {img} = req.files

            let filename = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', filename))

            const service = new Service({
                name,
                description,
                doctor,
                price,
                img: filename
            })
            await service.save()
            return res.status(201).json({message: 'Service created successfully', service})

        } catch (e) {
            return next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res, next) {
        try {
            let {page, limit} = req.query
            page = parseInt(page) || 1
            limit = parseInt(limit) || 10
            const skip = (page - 1) * limit
            const services = await Service
                .find({})
                .skip(skip)
                .limit(limit)
            const count = await Service.countDocuments({})
            return res.json({count: count, services})
        }
        catch(e) {
            return next(ApiError.internal(e.message))
        }
    }

    async getOne(req, res, next) {
        try {
            const {id} = req.params;
            if(id === 'search') return next(ApiError.badRequest('Search query cannot be empty!'))

            const service = await Service.findById(id);

            if (!service) {
                return next(ApiError.badRequest('Service not found'));
            }
            return res.json(service);
        } catch (e) {
            return next(ApiError.internal(e.message));
        }
    }

    async delete(req, res, next) {
        try {
            const {id} = req.params
            const deletedService = await Service.findByIdAndDelete(id)

            if (!deletedService) {
                return next(ApiError.badRequest('Service not found'))
            }
            return res.json({message: 'Service deleted successfully'})
        } catch (e) {
            return next(ApiError.internal(e.message));
        }
    }

    async search(req, res, next) {
        try {
            const { input } = req.params;
            const searchTerm = input.toLowerCase();
            const services = await Service.find({
                $or: [
                    { name: { $regex: searchTerm, $options: 'i' } },
                    { description: { $regex: searchTerm, $options: 'i' } },
                ],
            });
            return res.json({ services });
        } catch (e) {
            return next(ApiError.badRequest(e.message));
        }
    }
}

module.exports = new ServiceController()