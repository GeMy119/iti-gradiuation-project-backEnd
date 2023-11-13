// models/carReservation.model.js
const mongoose = require('mongoose');

const carReservationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true,
    },
    car: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Car', // Reference to the Car model
        required: true,
    },
    pickupDate: {
        type: Date,
        required: true,
    },
    returnDate: {
        type: Date,
        required: true,
    },
    // Add other reservation details if needed
});

const CarReservation = mongoose.model('CarReservation', carReservationSchema);

module.exports = CarReservation;
