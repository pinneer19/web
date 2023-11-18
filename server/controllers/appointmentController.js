const Appointment = require('../models/appointment')
const ApiError = require('../error/ApiError')
const Service = require("../models/service");
const Doctor = require("../models/doctor");
const mongoose = require("mongoose");

class AppointmentController {
    async create(req, res, next) {
        try {
            const {user, service, doctor, date_time} = req.body
            const appointment = new Appointment({
                user,
                service,
                doctor,
                date_time
            })
            await appointment.save()
            return res.status(201).json({message: 'Appointment created successfully', appointment})
        } catch (e) {
            return next(ApiError.internal(e.message))
        }
    }

    async getAll(req, res, next) {
        try {
            const appointments = await Appointment.find({})
            return res.json(appointments)
        }
        catch(e) {
            return next(ApiError.internal(e.message))
        }
    }

    async getByDoctor(req, res, next) {
        try {
            const {doctor} = req.params;
            const appointments = await Appointment.find({doctor});
            return res.json({message: 'Appointment was created successfully!', appointments});
        } catch (e) {
            return next(ApiError.internal(e.message));
        }
    }

    async getByUser(req, res, next) {
        try {
            const {user} = req.params;
            const appointments = await Appointment.find({user});
            return res.json(appointments);
        } catch (e) {
            return next(ApiError.internal(e.message));
        }
    }

    async getById(req, res, next) {
        try {
            const {id} = req.params
            const appointment = await Appointment.findById(id)

            if (!appointment) {
                return next(ApiError.badRequest('Appointment not found'));
            }
            return res.json(appointment);
        } catch (e) {
            return next(ApiError.internal(e.message));
        }
    }

    async getByUserAndDoctor(req, res, next) {
        try {
            const {user, doctor} = req.params
            const appointments = await Appointment.find({user, doctor})

            if (!appointments) {
                return next(ApiError.badRequest('Appointment not found'));
            }
            return res.json(appointments);
        } catch (e) {
            return next(ApiError.internal(e.message));
        }
    }

    async delete(req, res, next) {
        try {
            const {id} = req.params
            const deletedAppointment = await Appointment.findByIdAndDelete(id);

            if (!deletedAppointment) {
                return next(ApiError.badRequest('Appointment not found'))
            }
            return res.json({message: 'Appointment deleted successfully'});
        } catch (e) {
            return next(ApiError.internal(e.message));
        }
    }
}

module.exports = new AppointmentController()