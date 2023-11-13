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
            console.log(user);
            user.hotelId.push(id);
            await user.save();
            res.status(StatusCodes.OK).json({ message: `hotel id added` });
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
        const {id} = req.body;
        if (id) {
            const userReq = req.user;
            const user = await User.findById(userReq.id)
            // const event = await Event.findById(id)
            user.eventId.push(id);
            // event.counter += 1
            // await event.save()
            await user.save();
            res.status(StatusCodes.OK).json({ message: `event id added` });
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
        const {id} = req.body;
        if (id) {
            const userReq = req.user;
            const user = await User.findById(userReq.id)
            // const restaurant = await Resturant.findById(id)
            user.restaurantId.push(id);
            // restaurant.counter += 1
            // await restaurant.save()
            await user.save();
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
        const {id} = req.body;
        if (id) {
            const userReq = req.user;
            const user = await User.findById(userReq.id)
            // const visitPlace = await VisitPlace.findById(id)
            user.visitPlaceId.push(id);
            // visitPlace.counter += 1
            // await visitPlace.save()
            await user.save();
            res.status(StatusCodes.OK).json({ message: `visitPlace id added` });
        } else {
            res.status(StatusCodes.BAD_REQUEST).json({ message: "Invalid ID" });
        }
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Error", error });
    }
}
const addCarId = async (req, res) => {
    try {
        const {id} = req.body;
        if (id) {
            const userReq = req.user;
            const user = await User.findById(userReq.id)
            // const car = await Car.findById(id)
            user.carId.push(id);
            // car.counter += 1
            // await car.save()
            await user.save();
            res.status(StatusCodes.OK).json({ message: `car id added` });
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
    addVisitPlaceId
};
