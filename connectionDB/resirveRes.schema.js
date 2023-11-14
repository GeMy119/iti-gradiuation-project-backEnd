// models/reservRest.model.js
const mongoose = require('mongoose');

const reservRestSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true,
    },
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Resturant', // Reference to the Restaurant model
        required: true,
    },
    reservationDate: {
        type: Date,
        required: true,
    },
    numberOfGuests: {
        type: Number,
        required: true,
    },
    // Add other reservation details if needed
});

const reservRest = mongoose.model('reservRest', reservRestSchema);

module.exports = reservRest;
