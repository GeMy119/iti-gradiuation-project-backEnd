const cloud = require("../../connectionDB/config");
const VisitPlace = require("../../connectionDB/visitplace.schema")

const addvisitplace = async (req, res) => {
    try {
        // Destructure request body
        let { visitName, email, address, phone, location, price, image } = req.body;

        // Upload image to Cloudinary
        const result = await cloud(req.file.path);
        console.log(result);

        // Insert hotel into the database
        let addedPlace = await VisitPlace.create({
            visitName,
            email,
            address,
            phone,
            price,
            location,
            image: result.secure_url
        });

        // Respond with success message and added hotel
        res.status(201).json({ message: "Added Success", addedPlace });
    } catch (error) {
        console.error('Error adding car:', error);

        // Respond with an error message
        res.status(500).json({ message: "Internal Server Error", error });
    }
};
const uploadImageVisitPlace = async (req, res) => {
    try {
        const visitPlaceId = req.params.visitPlaceId;

        // Check if the user with the provided ID exists
        const visitPlace = await VisitPlace.findById(visitPlaceId);
        if (!visitPlace) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "visitPlaceId not found" });
        }
        // Assuming you have Multer configured correctly, you can access the uploaded file using req.file
        if (!req.file) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "No file uploaded" });
        }
        const result = await cloud(req.file.path)
        // Assuming you have a Post model defined and it contains a 'photo' field
        // Update the user's profile picture
        const updatedVisitPlace = await VisitPlace.findByIdAndUpdate(id, {
            image: result.secure_url, // Adjust the path accordingly
        });

        // Check if the update was successful
        if (!updatedVisitPlace) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Failed to Updated VisitPlace" });
        }

        res.status(StatusCodes.OK).json({ message: "Visit Place Updated" });
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Internal Server Error" });
    }
};
const updatevisitplace = async (req, res) => {
    const visitid = req.params.id;
    let updatedVisit = await VisitPlace.findByIdAndUpdate(visitid, {
        visitName: req.body.visitName,
        email: req.body.email, address: req.body.address, phone: req.body.phone,
        location: req.body.location, price: req.body.price
    }, { new: true })
    res.json({ message: "Update Sucess", updatedVisit })
}

const deletevisitplace = async (req, res) => {
    try {
        const placeid = req.params.id;

        // Find the place by ID
        const place = await VisitPlace.findById(placeid);
        if (!place) {
            return res.status(404).json({ error: 'place not found' });
        }

        // Delete the place using its ID
        const deletedplace = await VisitPlace.findByIdAndDelete(placeid);
        if (!deletedplace) {
            return res.status(404).json({ error: 'place not found' });
        }

        res.json({ message: 'Deleted successfully', deletedplace });
    } catch (error) {
        // Handle any errors that might occur during the process
        console.error('Error:', error);
        res.status(500).json({ error: 'Server error' });
    }
};


const softdeletePlace = async (req, res) => {
    const placeid = req.params.id;

    // Find the place by ID
    const place = await VisitPlace.findById(placeid);
    if (!place) {
        return res.status(404).json({ error: 'place not found' });
    }
    const placevisit = await VisitPlace.findById(placeid);
    placevisit.deleted = true
    await placevisit.save();
    res.json({ message: "Soft Deleted Success" })


}
const unDeletePlace = async (req, res) => {
    const placeid = req.params.id;

    // Find the place by ID
    const place = await VisitPlace.findById(placeid);
    if (!place) {
        return res.status(404).json({ error: 'place not found' });
    }
    place.deleted = false
    await place.save();
    res.json({ message: "unDeleted Success" })
}
const getSoftDelete = async (req, res) => {
    const getsoftdellPlace = await VisitPlace.find({ deleted: true });
    res.json({ message: "All Soft Deleted Places", getsoftdellPlace })
}

const searchVisitPlace = async (req, res) => {
    const { searchChar } = req.query;
    try {
        // Use find to retrieve all documents that match the partialUsername

        const searchCriteria = {
            visitName: { $regex: new RegExp(searchChar, 'i') },
        };
        const visitPlaces = await VisitPlace.find(searchCriteria);

        if (!visitPlaces || visitPlaces.length === 0) {
            return res.status(404).json({ message: 'visitPlaces not found' });
        }

        return res.status(200).json({ visitPlaces });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};



const getallvisitplace = async (req, res) => {
    const allplace = await VisitPlace.find();
    res.status(201).json({ message: "All Places", allplace })
}


const getvisitplace = async (req, res) => {
    const placeid = req.params.id;

    // Find the task by ID
    const place = await VisitPlace.findById(placeid);


    res.status(201).json({ message: "get place", place })
}

module.exports = {
    addvisitplace,
    updatevisitplace,
    deletevisitplace,
    getallvisitplace,
    getvisitplace,
    softdeletePlace,
    getSoftDelete,
    uploadImageVisitPlace,
    searchVisitPlace,
    unDeletePlace
}