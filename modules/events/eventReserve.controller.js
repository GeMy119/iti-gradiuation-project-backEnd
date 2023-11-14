// controllers/eventReservController.js
const { StatusCodes } = require('http-status-codes');
const EventReserv = require('../../connectionDB/eventReserv.scheam');

// Controller to update the reservation status (e.g., reserveTiket) to true
const addEventReserv = async (req, res) => {
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

        // Create a new reservation
        const eventReserv = await EventReserv.create({
            user: userId,
            eventId,
            reserveTicket: true, // You can set the default value based on your logic
            // Add other reservation details if needed
        });

        if (!eventReserv) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'Event party reservation not found' });
        }

        res.status(StatusCodes.OK).json({ message: 'Event party reserved', eventReserv });
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error adding event party reservation', error });
    }
};
const getAllEventReservations = async (req, res) => {
    try {
        const eventReservations = await EventReserv.find().populate('user').populate('eventParty');
        res.status(StatusCodes.OK).json({ eventReservations });
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error fetching event reservations', error });
    }
};

module.exports = {
    addEventReserv,
    getAllEventReservations
};
