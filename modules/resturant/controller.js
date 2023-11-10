
const Resturant = require("../../connectionDB/resturant.schema")
const addRestaurant = async (req, res) => {
    try {
        // Destructure request body
        let { restName, email, address, phone, location, image } = req.body;

        // Insert restaurant into the database
        let addRestaurant = await Resturant.create({
            restName,
            email,
            address,
            phone,
            location,
            image: `localhost:8000/${req.file.path}`
        });

        // Respond with success message and added restaurant
        res.status(201).json({ message: "Added Success", addRestaurant });
    } catch (error) {
        console.error('Error adding restaurant:', error);

        // Respond with an error message
        res.status(500).json({ message: "Internal Server Error", error });
    }
};

const uploadImageResturant = async (req, res) => {
    try {
        const resturantId = req.params.resturantId;

        // Check if the user with the provided ID exists
        const resturant = await Resturant.findById(resturantId);
        if (!resturant) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "car not found" });
        }
        // Assuming you have Multer configured correctly, you can access the uploaded file using req.file
        if (!req.file) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "No file uploaded" });
        }

        // Assuming you have a Post model defined and it contains a 'photo' field
        // Update the user's profile picture
        const updatedResturant = await Resturant.findByIdAndUpdate(id, {
            image: `sea7a/${req.file.path}`, // Adjust the path accordingly
        });

        // Check if the update was successful
        if (!updatedResturant) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Failed to Updated Resturant" });
        }

        res.status(StatusCodes.OK).json({ message: "Resturant Updated" });
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Internal Server Error" });
    }
};

const updateresturant = async (req, res) => {
    const resturantid = req.params.id;
    let updatedResturant = await Resturant.findByIdAndUpdate(resturantid, {
        restName: req.body.restName,
        email: req.body.email, address: req.body.address, phone: req.body.phone,
        location: req.body.location
    }, { new: true })
    res.json({ message: "Update Sucess", updatedResturant })
}

const deleteresturant = async (req, res) => {
    try {
        const resturantid = req.params.id;

        // Find the place by ID
        const resturant = await Resturant.findById(resturantid);
        if (!resturant) {
            return res.status(404).json({ error: 'place not found' });
        }

        // Delete the place using its ID
        const deletedresturant = await Resturant.findByIdAndDelete(resturantid);
        if (!deletedresturant) {
            return res.status(404).json({ error: 'place not found' });
        }

        res.json({ message: 'Deleted successfully', deletedresturant });
    } catch (error) {
        // Handle any errors that might occur during the process
        console.error('Error:', error);
        res.status(500).json({ error: 'Server error' });
    }
};


const softdeleteresturant = async (req, res) => {
    const resturantid = req.params.id;

    // Find the place by ID
    const resturant = await Resturant.findById(resturantid);
    if (!resturant) {
        return res.status(404).json({ error: 'place not found' });
    }
    const softresturant = await Resturant.findById(resturant);
    softresturant.deleted = true
    await softresturant.save();
    res.json({ message: "Soft Deleted Success" })


}
const unDeleteresturant = async (req, res) => {
    const resturantid = req.params.id;

    // Find the place by ID
    const resturant = await Resturant.findById(resturantid);
    if (!resturant) {
        return res.status(404).json({ error: 'place not found' });
    }
    // const softresturant = await Resturant.findById(resturant);
    resturant.deleted = false
    await resturant.save();
    res.json({ message: "un Deleted Success" })
}
const searchResturant = async (req, res) => {
    const { searchChar } = req.query;
    try {
        // Use find to retrieve all documents that match the partialUsername

        const searchCriteria = {
            resturantName: { $regex: new RegExp(searchChar, 'i') },
        };
        const resturants = await Resturant.find(searchCriteria);

        if (!resturants || resturants.length === 0) {
            return res.status(404).json({ message: 'resturants not found' });
        }

        return res.status(200).json({ resturants });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};
const getSoftDeleteResturant = async (req, res) => {
    const getsoftdellresturant = await Resturant.find({ deleted: true });
    res.json({ message: "All Soft Deleted resturant", getsoftdellresturant })
}





const getallresturant = async (req, res) => {
    const allresturant = await Resturant.find();
    res.status(201).json({ message: "All resturant", allresturant })
}


const getvisitresturant = async (req, res) => {
    const resturantid = req.params.id;

    // Find the task by ID
    const resturant = await Resturant.findById(resturantid);


    res.status(201).json({ message: "get place", resturant })
}

module.exports = {
    addResturant,
    updateresturant,
    deleteresturant,
    getallresturant,
    getvisitresturant,
    softdeleteresturant,
    getSoftDeleteResturant,
    uploadImageResturant,
    searchResturant,
    unDeleteresturant
}