const mongoose = require("mongoose");
const hotelSchema = new mongoose.Schema({
    hotelName: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    location: { type: String, required: true },
    ratings: [{ type: Number }],
    averageRating: { type: Number },
    image: { type: String, default: null },
    counter: { type: Number },
    deleted: { type: Boolean, default: false },

}, {
    timestamps: true
});
const Hotel = mongoose.model("Hotel", hotelSchema);

module.exports = Hotel;