const { StatusCodes } = require("http-status-codes");
// const Hotel = require("../../../connectionDB/hotels.schema");
// const Event = require("../../../connectionDB/event.schema");
// const Resturant = require("../../../connectionDB/resturant.schema");
// const VisitPlace = require("../../../connectionDB/visitplace.schema");
// const Car = require("../../../connectionDB/car.schema");
const User = require("../../../connectionDB/user.schema");

const addHotelId = async (req, res) => {
    try {
        const { id } = req.body;
        if (id) {
            const userReq = req.user;
            const user = await User.findById(userReq.id);
            if (!user.hotelId.includes(id)) {
                user.hotelId.push(id);
                await user.save();
                res.status(StatusCodes.OK).json({ message: `hotel id added` });
            } else {
                res.status(StatusCodes.OK).json({ message: `hotel id is already added` });
            }
        } else {
            res.status(StatusCodes.BAD_REQUEST).json({ message: "Invalid ID" });
        }
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Error", error });
    }
};
const addEventId = async (req, res) => {
    try {
        const { id } = req.body;
        if (id) {
            const userReq = req.user;
            const user = await User.findById(userReq.id)
            if (!user.eventId.includes(id)) {
                user.eventId.push(id);
                await user.save();
                res.status(StatusCodes.OK).json({ message: `event id added` });
            } else {
                res.status(StatusCodes.OK).json({ message: `event id is already added` });
            }
        } else {
            res.status(StatusCodes.BAD_REQUEST).json({ message: "Invalid ID" });
        }
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Error", error });
    }
}
const addResId = async (req, res) => {
    try {
        const { id } = req.body;
        if (id) {
            const userReq = req.user;
            const user = await User.findById(userReq.id)
            // const restaurant = await Resturant.findById(id)
            if (!user.restaurantId.includes(id)) {
                user.restaurantId.push(id);
                await user.save();
                res.status(StatusCodes.OK).json({ message: `restaurant id added` });
            } else {
                res.status(StatusCodes.OK).json({ message: `restaurant id is already added` });
            }
            // restaurant.counter += 1
            // await restaurant.save()
            res.status(StatusCodes.OK).json({ message: `restaurant id added` });
        } else {
            res.status(StatusCodes.BAD_REQUEST).json({ message: "Invalid ID" });
        }
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Error", error });
    }
}
const addVisitPlaceId = async (req, res) => {
    try {
        const { id } = req.body;
        if (id) {
            const userReq = req.user;
            const user = await User.findById(userReq.id);

            // Check if id already exists in visitPlaceId array
            if (!user.visitPlaceId.includes(id)) {
                user.visitPlaceId.push(id);
                await user.save();
                res.status(StatusCodes.OK).json({ message: `visitPlace id added` });
            } else {
                res.status(StatusCodes.OK).json({ message: `visitPlace id is already added` });
            }
        } else {
            res.status(StatusCodes.BAD_REQUEST).json({ message: "Invalid ID" });
        }
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Error", error });
    }
};
const addCarId = async (req, res) => {
    try {
        const { id } = req.body;
        if (id) {
            const userReq = req.user;
            const user = await User.findById(userReq.id)
            if (!user.carId.includes(id)) {
                user.carId.push(id);
                await user.save();
                res.status(StatusCodes.OK).json({ message: `car id added` });
            } else {
                res.status(StatusCodes.OK).json({ message: `car id is already added` });
            }
        } else {
            res.status(StatusCodes.BAD_REQUEST).json({ message: "Invalid ID" });
        }
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Error", error });
    }
}




module.exports = {
    addCarId,
    addEventId,
    addHotelId,
    addResId,
    addVisitPlaceId,
};
