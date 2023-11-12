const cloud = require("../../connectionDB/config");
const Event = require("../../connectionDB/event.schema")
const addEvent = async (req, res) => {
    try {
        // Destructure request body
        let { eventName, email, address, phone, location, image, organizer, price } = req.body;

        // Upload image to Cloudinary
        const result = await cloud(req.file.path);
        console.log(result);

        // Insert hotel into the database
        let addedEvent = await Event.create({
            eventName,
            email,
            address,
            phone,
            location,
            organizer,
            price,
            image: result.secure_url
        });

        // Respond with success message and added hotel
        res.status(201).json({ message: "Added Success", addedEvent });
    } catch (error) {
        console.error('Error adding car:', error);

        // Respond with an error message
        res.status(500).json({ message: "Internal Server Error", error });
    }
};
const updateEvent = async (req, res) => {
    try {
        const eventId = req.params.id;
        const { eventName, email, address, phone, location,organizer,price } = req.body;

        // Check if req.file exists (a new image is being sent)
        if (req.file) {
            // Upload the new image to Cloudinary
            const result = await cloud(req.file.path);
            console.log(result);

            // Update hotel with new image URL
            const updatedEvent = await Event.findByIdAndUpdate(
                eventId,
                {
                    eventName,
                    email,
                    organizer,
                    price,
                    address,
                    phone,
                    location,
                    image: result.secure_url
                },
                { new: true }
            );

            res.json({ message: "Update Success with new image", updatedEvent });
        } else {
            // No new image, update other information without changing the image
            const updatedEvent = await Event.findByIdAndUpdate(
                eventId,
                {
                    eventName,
                    email,
                    organizer,
                    price,
                    address,
                    phone,
                    location,
                },
                { new: true }
            );

            res.json({ message: "Update Success without changing the image", updatedEvent });
        }
    } catch (error) {
        console.error('Error updating event:', error);
        res.status(500).json({ message: "Internal Server Error", error });
    }
};
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
    unDeleteEvent,
    searchEvent
}