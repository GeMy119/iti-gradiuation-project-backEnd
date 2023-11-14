// controllers/visitPlaceReservController.js
const { StatusCodes } = require('http-status-codes');
const VisitPlaceReserv = require('../../connectionDB/reservVisitPlace');

// Controller to reserve a visit place
const reserveVisitPlace = async (req, res) => {
    try {
        const { visitPlaceId } = req.body;
        const userId = req.user.id;

        // Validate user authentication
        if (!userId) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ message: "User not found" });
        }

        // Validate input
        if (!visitPlaceId) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Invalid input data' });
        }

        // Create a new reservation
        const newVisitPlaceReserv = await VisitPlaceReserv.create({
            user: userId,
            visitPlaceId,
            reserveTicket: true, // You can set the default value based on your logic
            // Add other reservation details if needed
        });

        res.status(StatusCodes.CREATED).json({ message: 'Visit place reservation created successfully', newVisitPlaceReserv });
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error creating visit place reservation', error });
    }
};

const getAllVisitPlaceReserv = async (req, res) => {
    try {
        // Fetch all visit place reservations for the user
        const allVisitPlaceReserv = await VisitPlaceReserv.find().populate('visitPlaceId').populate("user");

        res.status(StatusCodes.OK).json({ allVisitPlaceReserv });
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error fetching visit place reservations', error });
    }
};
module.exports = {
    reserveVisitPlace,
    getAllVisitPlaceReserv
};
