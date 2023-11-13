const mongoose = require("mongoose");
const resturantSchema = new mongoose.Schema({
    restName: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    image: { type: String, default: null },
    location: { type: String, required: true },
    ratings: [{ type: Number }],
    averageRating: { type: Number },
    counter: { type: Number },
    deleted: { type: Boolean, default: false },
    phone: { type: String, required: true },
}, {
    timestamps: true
});
const Resturant = mongoose.model("Resturant", resturantSchema);

module.exports = Resturant;