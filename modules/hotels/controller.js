
const Hotel = require("../../connectionDB/hotels.schema")
const addHotel = async (req, res) => {
    try {
        // Destructure request body
        let { hotelName, email, address, phone, location, image } = req.body;

        // Insert hotel into the database
        let addHotel = await Hotel.create({
            hotelName,
            email,
            address,
            phone,
            location,
            image: `localhost:8000/${req.file.path}`
        });

        // Respond with success message and added hotel
        res.status(201).json({ message: "Added Success", addHotel });
    } catch (error) {
        console.error('Error adding hotel:', error);

        // Respond with an error message
        res.status(500).json({ message: "Internal Server Error", error });
    }
};
const uploadImageHotel = async (req, res) => {
    try {
        const hotelId = req.params.hotelId;

        // Check if the user with the provided ID exists
        const hotel = await Event.findById(hotelId);
        if (!hotel) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "hotel not found" });
        }

        // Assuming you have Multer configured correctly, you can access the uploaded file using req.file
        if (!req.file) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "No file uploaded" });
        }

        // Assuming you have a Post model defined and it contains a 'photo' field
        // Update the user's profile picture
        const updatedHotel = await Hotel.findByIdAndUpdate(id, {
            image: `sea7a/${req.file.path}`, // Adjust the path accordingly
        });

        // Check if the update was successful
        if (!updatedHotel) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Failed to updated Hotel" });
        }

        res.status(StatusCodes.OK).json({ message: "Hotel Updated" });
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Internal Server Error" });
    }
};
const updateHotel = async (req, res) => {
    const hotelid = req.params.id;
    let updatedHotel = await Hotel.findByIdAndUpdate(hotelid, {
        hotelName: req.body.hotelName,
        email: req.body.email, address: req.body.address, phone: req.body.phone,
        location: req.body.location
    }, { new: true })
    res.json({ message: "Update Sucess", updatedHotel })
}
const deleteHotel = async (req, res) => {
    try {
        const hotelid = req.params.id;

        // Find the place by ID
        const hotel = await Hotel.findById(hotelid);
        if (!hotel) {
            return res.status(404).json({ error: 'hotel not found' });
        }

        // Delete the place using its ID
        const deleteEvent = await Hotel.findByIdAndDelete(hotel);
        if (!deleteEvent) {
            return res.status(404).json({ error: 'hotel not found' });
        }

        res.json({ message: 'Deleted successfully', deleteEvent });
    } catch (error) {
        // Handle any errors that might occur during the process
        console.error('Error:', error);
        res.status(500).json({ error: 'Server error' });
    }
};
const softdeleteHotel = async (req, res) => {
    const hotelid = req.params.id;

    // Find the place by ID
    const hotel = await Hotel.findById(hotelid);
    if (!hotel) {
        return res.status(404).json({ error: 'event not found' });
    }
    const softHotel = await Hotel.findById(hotel);
    softHotel.deleted = true
    await softHotel.save();
    res.json({ message: "Soft Deleted Success" })
}
const unDeleteHotel = async (req, res) => {
    const hotelid = req.params.id;

    // Find the place by ID
    const hotel = await Hotel.findById(hotelid);
    if (!hotel) {
        return res.status(404).json({ error: 'event not found' });
    }
    hotel.deleted = false
    await hotel.save();
    res.json({ message: "un Deleted Success" })
}
const getSoftDeleteHotels = async (req, res) => {
    const getsoftdellHotels = await Hotel.find({ deleted: true });
    res.json({ message: "All Soft Deleted Hotels", getsoftdellHotels })
}
const getallHotels = async (req, res) => {
    const allHotels = await Hotel.find();
    res.status(201).json({ message: "All Hotels", allHotels })
}


const getHotel = async (req, res) => {
    const hotelid = req.params.id;

    // Find the task by ID
    const hotel = await Hotel.findById(hotelid);


    res.status(201).json({ message: "get hotel", hotel })
}
const searchHotel = async (req, res) => {
    const { searchChar } = req.query;
    try {
        // Use find to retrieve all documents that match the partialUsername

        const searchCriteria = {
            hotelName: { $regex: new RegExp(searchChar, 'i') },
        };
        const hotels = await Hotel.find(searchCriteria);

        if (!hotels || hotels.length === 0) {
            return res.status(404).json({ message: 'hotels not found' });
        }

        return res.status(200).json({ hotels });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};
module.exports = {
    addHotel,
    updateHotel,
    deleteHotel,
    getallHotels,
    getHotel,
    softdeleteHotel,
    getSoftDeleteHotels,
    uploadImageHotel,
    unDeleteHotel,
    searchHotel
}