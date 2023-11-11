const Car = require("../../connectionDB/car.schema");
const cloud = require("../../connectionDB/config");
const addCar = async (req, res) => {
    try {
        // Destructure request body
        let { carName, email, address, phone, location, image } = req.body;

        // Upload image to Cloudinary
        const result = await cloud(req.file.path);
        console.log(result);

        // Insert hotel into the database
        let addedCar = await Car.create({
            carName,
            email,
            address,
            phone,
            location,
            image: result.secure_url
        });

        // Respond with success message and added hotel
        res.status(201).json({ message: "Added Success", addedCar });
    } catch (error) {
        console.error('Error adding car:', error);

        // Respond with an error message
        res.status(500).json({ message: "Internal Server Error", error });
    }
};
const uploadImageCar = async (req, res) => {
    try {
        const carId = req.params.carId;

        // Check if the user with the provided ID exists
        const car = await Car.findById(carId);
        if (!car) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "car not found" });
        }

        // Assuming you have Multer configured correctly, you can access the uploaded file using req.file
        if (!req.file) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "No file uploaded" });
        }
        const result = await cloud(req.file.path);
        // Assuming you have a Post model defined and it contains a 'photo' field
        // Update the user's profile picture
        const updatedCar = await Car.findByIdAndUpdate(id, {
            image:  result.secure_url, // Adjust the path accordingly
        });
        // Check if the update was successful
        if (!updatedCar) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Failed to update car" });
        }
        res.status(StatusCodes.OK).json({ message: "car Updated" });
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Internal Server Error" });
    }
};
const updateCar = async (req, res) => {
    const carid = req.params.id;
    let updatedCar = await Car.findByIdAndUpdate(carid, {
        carName: req.body.restName,
        email: req.body.email, address: req.body.address, phone: req.body.phone,
        location: req.body.location
    }, { new: true })
    res.json({ message: "Update Sucess", updatedCar })
}

const deleteCar = async (req, res) => {
    try {
        const carid = req.params.id;

        // Find the place by ID
        const car = await Resturant.findById(carid);
        if (!car) {
            return res.status(404).json({ error: 'place not found' });
        }

        // Delete the place using its ID
        const deletedCar = await Car.findByIdAndDelete(carid);
        if (!deletedCar) {
            return res.status(404).json({ error: 'place not found' });
        }

        res.json({ message: 'Deleted successfully', deletedCar });
    } catch (error) {
        // Handle any errors that might occur during the process
        console.error('Error:', error);
        res.status(500).json({ error: 'Server error' });
    }
};


const softdeleteCar = async (req, res) => {
    const carid = req.params.id;

    // Find the place by ID
    const car = await Resturant.findById(carid);
    if (!car) {
        return res.status(404).json({ error: 'place not found' });
    }
    const softCar = await Car.findById(car);
    softCar.deleted = true
    await softCar.save();
    res.json({ message: "Soft Deleted Success" })
}
const unDeleteCar = async (req, res) => {
    const carid = req.params.id;

    // Find the place by ID
    const car = await Resturant.findById(carid);
    if (!car) {
        return res.status(404).json({ error: 'car not found' });
    }
    car.deleted = false
    await car.save();
    res.json({ message: "unDeleted Success" })
}
const getSoftDeleteCar = async (req, res) => {
    const getsoftdellcar = await Car.find({ deleted: true });
    res.json({ message: "All Soft Deleted resturant", getsoftdellcar })
}

const getallCar = async (req, res) => {
    const allCar = await Car.find();
    res.status(201).json({ message: "All Car", allCar })
}


const getCar = async (req, res) => {
    const Carid = req.params.id;

    // Find the task by ID
    const car = await Car.findById(Carid);


    res.status(201).json({ message: "get Car", car })
}
const searchCar = async (req, res) => {
    const { searchChar } = req.query;
    try {
        // Use find to retrieve all documents that match the partialUsername

        const searchCriteria = {
            carName: { $regex: new RegExp(searchChar, 'i') },
        };
        const cars = await Car.find(searchCriteria);

        if (!cars || cars.length === 0) {
            return res.status(404).json({ message: 'cars not found' });
        }

        return res.status(200).json({ cars });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};
module.exports = {
    addCar,
    updateCar,
    deleteCar,
    getallCar,
    getCar,
    softdeleteCar,
    getSoftDeleteCar,
    uploadImageCar,
    unDeleteCar,
    searchCar
}