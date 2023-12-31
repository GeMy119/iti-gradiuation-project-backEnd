const mongoose = require("mongoose");
const eventSchema = new mongoose.Schema({
    eventName: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    image: { type: String, default: null },
    location: { type: String, required: true },
    organizer: { type: String, required: true },
    ratings: [{ type: Number }],
    averageRating: { type: Number },
    price: { type: Number },
    counter: { type: Number },
    deleted: { type: Boolean, default: false },
    phone: { type: String, required: true },

}, {
    timestamps: true
});
const Event = mongoose.model("Event", eventSchema);

module.exports = Event;