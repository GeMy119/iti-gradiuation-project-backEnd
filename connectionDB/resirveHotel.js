const mongoose = require("mongoose");
const resirveHotelSchema = new mongoose.Schema({

    userId: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    HotelId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Hotel" }],
    email: { type: String, required: true },
    address: { type: String, required: true },
    image: { type: String, default: null },
    location: { type: String, required: true },
    rate: { type: Number },
    counter: { type: Number },
    deleted: { type: Boolean, default: false },
    phone: { type: String, required: true },
}, {
    timestamps: true
});
const Resturant = mongoose.model("Resturant", resturantSchema);

module.exports = Resturant;