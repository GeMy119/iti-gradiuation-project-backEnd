
const Event = require("../../connectionDB/event.schema")
const addEvent = async (req, res) => {
    try {
        let { eventName, email, address, image, location, organizer, price } = req.body;
        let addEvent = await Event.create({
            eventName,
            email,
            address,
            image: `localhost:8000/${req.file.path}`,
            location,
            organizer,
            price
        });

        res.status(201).json({ message: "Added Success", addEvent });
    } catch (error) {
        console.error('Error adding event:', error);
        res.status(500).json({ message: "Internal Server Error", error });
    }
};

const uploadImageEvent = async (req, res) => {
    try {
        const eventId = req.params.eventId;

        // Check if the user with the provided ID exists
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "event not found" });
        }

        // Assuming you have Multer configured correctly, you can access the uploaded file using req.file
        if (!req.file) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "No file uploaded" });
        }

        // Assuming you have a Post model defined and it contains a 'photo' field
        // Update the user's profile picture
        const updatedEvent = await Event.findByIdAndUpdate(id, {
            image: `sea7a/${req.file.path}`, // Adjust the path accordingly
        });

        // Check if the update was successful
        if (!updatedEvent) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Failed to updated Event" });
        }

        res.status(StatusCodes.OK).json({ message: "Event Updated" });
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Internal Server Error" });
    }
};

const updateEvent = async (req, res) => {
    const eventid = req.params.id;
    let updatedEvent = await Event.findByIdAndUpdate(eventid, {
        eventName: req.body.eventName,
        email: req.body.email, address: req.body.address, phone: req.body.phone,
        location: req.body.location , organizer: req.body.organizer , price:req.body.price
    }, { new: true })
    res.json({ message: "Update Sucess", updatedEvent })
}

const deleteEvent = async (req, res) => {
    try {
        const eventid = req.params.id;

        // Find the place by ID
        const event = await Event.findById(eventid);
        if (!event) {
            return res.status(404).json({ error: 'event not found' });
        }

        // Delete the place using its ID
        const deleteEvent = await Event.findByIdAndDelete(event);
        if (!deleteEvent) {
            return res.status(404).json({ error: 'event not found' });
        }

        res.json({ message: 'Deleted successfully', deleteEvent });
    } catch (error) {
        // Handle any errors that might occur during the process
        console.error('Error:', error);
        res.status(500).json({ error: 'Server error' });
    }
};


const softdeleteEvent = async (req, res) => {
    const eventid = req.params.id;

    // Find the place by ID
    const event = await Event.findById(eventid);
    if (!event) {
        return res.status(404).json({ error: 'event not found' });
    }
    const softEvent = await Event.findById(event);
    softEvent.deleted = true
    await softEvent.save();
    res.json({ message: "Soft Deleted Success" })
}
const unDeleteEvent = async (req, res) => {
    const eventid = req.params.id;

    // Find the place by ID
    const event = await Event.findById(eventid);
    if (!event) {
        return res.status(404).json({ error: 'event not found' });
    }
    event.deleted = false
    await event.save();
    res.json({ message: "un Deleted Success" })
}
const getSoftDeleteEvent = async (req, res) => {
    const getsoftdellEventes = await Event.find({ deleted: true });
    res.json({ message: "All Soft Deleted Events", getsoftdellEventes })
}





const getallEvnets = async (req, res) => {
    const allEvents = await Event.find();
    res.status(201).json({ message: "All Events", allEvents })
}


const getEvent = async (req, res) => {
    const eventid = req.params.id;

    // Find the task by ID
    const event = await Event.findById(eventid);


    res.status(201).json({ message: "get event", event })
}
const searchEvent = async (req, res) => {
    const { searchChar } = req.query;
    try {
        // Use find to retrieve all documents that match the partialUsername

        const searchCriteria = {
            eventName: { $regex: new RegExp(searchChar, 'i') },
        };
        const events = await Event.find(searchCriteria);

        if (!events || events.length === 0) {
            return res.status(404).json({ message: 'events not found' });
        }

        return res.status(200).json({ events });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};
module.exports = {
    addEvent,
    updateEvent,
    deleteEvent,
    getallEvnets,
    getEvent,
    softdeleteEvent,
    getSoftDeleteEvent,
    uploadImageEvent,
    unDeleteEvent,
    searchEvent
}