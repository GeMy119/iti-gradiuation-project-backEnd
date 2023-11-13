
const cloud = require("../../connectionDB/config");
const Resturant = require("../../connectionDB/resturant.schema");
const { flat } = require("../../rbac/policy/adminPolicy");

const addResturant = async (req, res) => {
    try {
        // Destructure request body
        let { restName, email, address, phone, location, image} = req.body;

        // Upload image to Cloudinary
        const result = await cloud(req.file.path);
        console.log(result);

        // Insert hotel into the database
        let addedRes = await Resturant.create({
            restName,
            email,
            address,
            phone,
            location,
            image: result.secure_url
        });

        // Respond with success message and added hotel
        res.status(201).json({ message: "Added Success", addedRes });
    } catch (error) {
        console.error('Error adding car:', error);

        // Respond with an error message
        res.status(500).json({ message: "Internal Server Error", error });
    }
};
const updateresturant = async (req, res) => {
    try {
        const resId = req.params.id;
        const { restName, email, address, phone, location } = req.body;

        // Check if req.file exists (a new image is being sent)
        if (req.file) {
            // Upload the new image to Cloudinary
            const result = await cloud(req.file.path);
            console.log(result);

            // Update hotel with new image URL
            const updatedRest = await Resturant.findByIdAndUpdate(
                resId,
                {
                    restName,
                    email,
                    address,
                    phone,
                    location,
                    image: result.secure_url
                },
                { new: true }
            );

            res.json({ message: "Update Success with new image", updatedRest });
        } else {
            // No new image, update other information without changing the image
            const updatedRest = await Resturant.findByIdAndUpdate(
                resId,
                {
                    restName,
                    email,
                    address,
                    phone,
                    location,
                },
                { new: true }
            );

            res.json({ message: "Update Success without changing the image", updatedRest });
        }
    } catch (error) {
        console.error('Error updating rest:', error);
        res.status(500).json({ message: "Internal Server Error", error });
    }
};
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
    const allresturant = await Resturant.find({deleted:false});
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
    searchResturant,
    unDeleteresturant
}