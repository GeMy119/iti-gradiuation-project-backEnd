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
const updateVisitPlace = async (req, res) => {
    try {
        const visitPlaceId = req.params.id;
        const { visitName, email, address, phone, location, price } = req.body;

        // Check if req.file exists (a new image is being sent)
        if (req.file) {
            // Upload the new image to Cloudinary
            const result = await cloud(req.file.path);
            console.log(result);

            // Update hotel with new image URL
            const updatedVisitPlace = await VisitPlace.findByIdAndUpdate(
                visitPlaceId,
                {
                    visitName,
                    email,
                    price,
                    address,
                    phone,
                    location,
                    image: result.secure_url
                },
                { new: true }
            );

            res.json({ message: "Update Success with new image", updatedVisitPlace });
        } else {
            // No new image, update other information without changing the image
            const updatedVisitPlace = await VisitPlace.findByIdAndUpdate(
                visitPlaceId,
                {
                    visitName,
                    email,
                    price,
                    address,
                    phone,
                    location,
                },
                { new: true }
            );

            res.json({ message: "Update Success without changing the image", updatedVisitPlace });
        }
    } catch (error) {
        console.error('Error updating VisitPlace:', error);
        res.status(500).json({ message: "Internal Server Error", error });
    }
};

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
    updateVisitPlace,
    deletevisitplace,
    getallvisitplace,
    getvisitplace,
    softdeletePlace,
    getSoftDelete,
    searchVisitPlace,
    unDeletePlace
}