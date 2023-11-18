const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    service: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service',
        required: true
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true
    },
    date_time: {
        type: Date,
        default: Date.now()
    },
});

// Создание модели на основе схемы
const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;