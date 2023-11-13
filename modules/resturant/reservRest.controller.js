// controllers/restaurantReservationController.js
const { StatusCodes } = require('http-status-codes');
const RestaurantReservation = require('../models/restaurantReservation.model');

// Controller to create a new restaurant reservation
const createRestReserve = async (req, res) => {
    try {
        const { user, restaurant, reservationDate, numberOfGuests } = req.body;

        // Validate input
        if (!user || !restaurant || !reservationDate || !numberOfGuests) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Invalid input data' });
        }

        // Create a new restaurant reservation
        const restaurantReservation = await RestaurantReservation.create({
            user,
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
const getAllReservRest = async (req, res) => {
    try {
        const reservations = await Reservation.find().populate('user').populate('hotel');
        res.status(StatusCodes.OK).json({ reservations });
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error fetching reservations', error });
    }
};

