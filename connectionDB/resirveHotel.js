const reservationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true,
    },
    hotel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hotel', // Reference to the Hotel model
        required: true,
    },
    checkInDate: {
        type: Date,
        required: true,
    },
    checkOutDate: {
        type: Date,
        required: true,
    },
    // Other reservation details can be added here
});

const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;