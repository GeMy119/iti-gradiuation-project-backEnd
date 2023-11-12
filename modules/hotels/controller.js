const cloud = require("../../connectionDB/config");
const Hotel = require("../../connectionDB/hotels.schema")
const addHotel = async (req, res) => {
    try {
        // Destructure request body
        let { hotelName, email, address, phone, location, image } = req.body;

        // Upload image to Cloudinary
        const result = await cloud(req.file.path);
        console.log(result);

        // Insert hotel into the database
        let addedHotel = await Hotel.create({
            hotelName,
            email,
            address,
            phone,
            location,
            image: result.secure_url
        });

        // Respond with success message and added hotel
        res.status(201).json({ message: "Added Success", addedHotel });
    } catch (error) {
        console.error('Error adding hotel:', error);

        // Respond with an error message
        res.status(500).json({ message: "Internal Server Error", error });
    }
};
// Make sure you replace 'your_cloud_name', 'your_api_key', and 'your_api_secret' with your actual Cloudinary credentials. Also, ensure that you have the cloudinary package installed (npm install cloudinary).


const updateHotel = async (req, res) => {
    try {
        const hotelId = req.params.id;
        const { hotelName, email, address, phone, location } = req.body;

        // Check if req.file exists (a new image is being sent)
        if (req.file) {
            // Upload the new image to Cloudinary
            const result = await cloud(req.file.path);
            console.log(result);

            // Update hotel with new image URL
            const updatedHotel = await Hotel.findByIdAndUpdate(
                hotelId,
                {
                    hotelName,
                    email,
                    address,
                    phone,
                    location,
                    image: result.secure_url
                },
                { new: true }
            );

            res.json({ message: "Update Success with new image", updatedHotel });
        } else {
            // No new image, update other information without changing the image
            const updatedHotel = await Hotel.findByIdAndUpdate(
                hotelId,
                {
                    hotelName,
                    email,
                    address,
                    phone,
                    location,
                },
                { new: true }
            );

            res.json({ message: "Update Success without changing the image", updatedHotel });
        }
    } catch (error) {
        console.error('Error updating hotel:', error);
        res.status(500).json({ message: "Internal Server Error", error });
    }
};
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
    const allHotels = await Hotel.find({ deleted: false});
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
    unDeleteHotel,
    searchHotel
}