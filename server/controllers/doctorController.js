const Doctor = require("../models/doctor");
const ApiError = require("../error/ApiError");
const Service = require("../models/service");

class DoctorController {
    async create(req, res, next) {
        try {
            const {firstName, lastName, specialization} = req.body
            const service = new Doctor({
                firstName,
                lastName,
                specialization
            })

            await service.save()
            return res.status(201).json({message: 'Doctor created successfully', service})
        } catch (e) {
            return next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res, next) {
        try {
            const doctors = await Doctor.find({})
            return res.json(doctors)
        }
        catch(e) {
            return next(ApiError.internal(e.message))
        }
    }

    async getOne(req, res, next) {
        try {
            const {id} = req.params;
            const doctor = await Doctor.findById(id);

            if (!doctor) {
                return next(ApiError.badRequest('Doctor not found'));
            }
            return res.json(doctor);
        } catch (e) {
            return next(ApiError.internal(e.message));
        }
    }

    async delete(req, res, next) {
        try {
            const {id} = req.params;
            const deletedDoctor = await Doctor.findByIdAndDelete(id);

            if (!deletedDoctor) {
                return next(ApiError.badRequest('Doctor not found'))
            }
            return res.json({message: 'Doctor deleted successfully'});
        } catch (e) {
            return next(ApiError.internal(e.message));
        }
    }
}

module.exports = new DoctorController()