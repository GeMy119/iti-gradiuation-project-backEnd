// controllers/reservationController.js
const { StatusCodes } = require('http-status-codes');
const Reservation = require('../../connectionDB/resirveHotel');

// Controller to create a new reservation
const createReservation = async (req, res) => {
    try {
        const userId = req.user.id
        if (!userId) {
            res.status(StatusCodes.UNAUTHORIZED).json({ message: "user not founded" })
        }
        const { hotel, checkInDate, checkOutDate } = req.body;
        // Validate input
        if (!hotel || !checkInDate || !checkOutDate) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Invalid input data' });
        }

        // Create a new reservation
        const reservation = await Reservation.create({
            user: userId,
            hotel,
            checkInDate,
            checkOutDate,
            // Add other reservation details if needed
        });

        res.status(StatusCodes.CREATED).json({ message: 'Reservation created successfully', reservation });
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error creating reservation', error });
    }
};

// Controller to get all reservations
const getAllReservations = async (req, res) => {
    try {
        const restReserv = await Reservation.find().populate('user').populate('hotel');
        res.status(StatusCodes.OK).json({ restReserv });
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error fetching reservations', error });
    }
};
const updateReservationStatus = async (req, res) => {
    try {
        const { reservationId } = req.params;

        // Validate input
        if (!reservationId) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Invalid input data' });
        }

        // Update the status of the reservation
        const updatedReservation = await Reservation.findByIdAndUpdate(
            reservationId,
            { $set: { status: "done" } },
            { new: true }
        );

        if (!updatedReservation) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'Reservation not found' });
        }

        res.status(StatusCodes.OK).json({ message: 'Reservation status updated successfully', updatedReservation });
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error updating reservation status', error });
    }
};
module.exports = {
    createReservation,
    getAllReservations,
    updateReservationStatus
};
