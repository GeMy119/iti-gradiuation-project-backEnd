// controllers/restaurantReservationController.js
const { StatusCodes } = require('http-status-codes');
const reservRest = require('../../connectionDB/resirveRes.schema');

// Controller to create a new restaurant reservation
const createRestReserve = async (req, res) => {
    try {
        const { restaurant, reservationDate, numberOfGuests } = req.body;
        const userId = req.user.id
        if (!userId) {
            res.status(StatusCodes.UNAUTHORIZED).json({ message: "user not founded" })
        }
        // Validate input
        if (!restaurant || !reservationDate || !numberOfGuests) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Invalid input data' });
        }

        // Create a new restaurant reservation
        const restaurantReservation = await reservRest.create({
            user: userId,
            restaurant,
            reservationDate,
            numberOfGuests,
            // Add other reservation details if needed
        });

        res.status(StatusCodes.CREATED).json({ message: 'Restaurant reservation created successfully', restaurantReservation });
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error creating restaurant reservation', error });
    }
};

// Controller to get all restaurant reservations
const getAllRestReserv = async (req, res) => {
    try {
        const restaurantReservations = await reservRest.find().populate('user').populate('resturant');
        res.status(StatusCodes.OK).json({ restaurantReservations });
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error fetching restaurant reservations', error });
    }
};

module.exports = {
    getAllRestReserv, createRestReserve
}