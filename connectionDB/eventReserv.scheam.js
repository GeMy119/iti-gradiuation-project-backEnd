// models/eventPartyReservation.model.js
const mongoose = require('mongoose');

const EventReservSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true,
    },
    eventParty: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'EventParty', // Reference to the EventParty model
        required: true,
    },
    reserveTiket: {
        type: Boolean,
        default: false
    }
    // Add other reservation details if needed
});

const EventReserv = mongoose.model('EventPartyReservation', EventReservSchema);

module.exports = EventReserv;
