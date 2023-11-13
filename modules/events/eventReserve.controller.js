// controllers/eventReservController.js
const { StatusCodes } = require('http-status-codes');
const EventReserv = require('../../connectionDB/eventReserv.scheam');

// Controller to update the reservation status (e.g., reserveTiket) to true
const updateEventReservToTrue = async (req, res) => {
    try {
        const { eventId } = req.body;
        const userId = req.user.id
        if (!userId) {
            res.status(StatusCodes.UNAUTHORIZED).json({ message: "user not founded" })
        }
        // Validate input
        if (!eventId) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Invalid input data' });
        }

        // Update the reservation status to true
        const updatedEventReserv = await EventReserv.findOneAndUpdate(
            { user: userId, eventParty: eventId },
            { $set: { reserveTiket: true } },
            { new: true }
        );

        if (!updatedEventReserv) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'Event party reservation not found' });
        }

        res.status(StatusCodes.OK).json({ message: 'Event party reservation status updated to true successfully', updatedEventReserv });
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error updating event party reservation status', error });
    }
};
const getAllEventReservations = async (req, res) => {
    try {
        const eventReservations = await EventReserv.find().populate('user').populate('event');
        res.status(StatusCodes.OK).json({ eventReservations });
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error fetching event reservations', error });
    }
};

module.exports = {
    updateEventReservToTrue,
    getAllEventReservations
};
