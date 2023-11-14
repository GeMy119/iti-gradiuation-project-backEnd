// models/tourismPlaceReservation.model.js
const mongoose = require('mongoose');

const VisitPlaceReservSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true,
    },
    visitPlaceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'VisitPlace', // Reference to the TourismPlace model
        required: true,
    },
    reserveTicket: {
        type: Boolean,
        default: false,
    },
    // Add other reservation details if needed
});

const VisitPlaceReserv = mongoose.model('TourismPlaceReservation', VisitPlaceReservSchema);

module.exports = VisitPlaceReserv;