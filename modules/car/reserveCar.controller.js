// controllers/carReservationController.js
const { StatusCodes } = require('http-status-codes');
const CarReservation = require('../../connectionDB/reserveCar.schema');

// Controller to create a new car reservation
const createCarReservation = async (req, res) => {
    try {
        const { user, car, pickupDate, returnDate } = req.body;
        const userId = req.user.id
        if (!userId) {
            res.status(StatusCodes.UNAUTHORIZED).json({ message: "user not founded" })
        }
        // Validate input
        if (!car || !pickupDate || !returnDate) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Invalid input data' });
        }
        // Create a new car reservation
        const carReservation = await CarReservation.create({
            user: userId,
            car,
            pickupDate,
            returnDate,
            // Add other reservation details if needed
        });

        res.status(StatusCodes.CREATED).json({ message: 'Car reservation created successfully', carReservation });
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error creating car reservation', error });
    }
};

// Controller to get all car reservations
const getAllCarReservations = async (req, res) => {
    try {
        const carReservations = await CarReservation.find().populate('user').populate('car');
        res.status(StatusCodes.OK).json({ carReservations });
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error fetching car reservations', error });
    }
};

module.exports = {
    createCarReservation,
    getAllCarReservations,
};
