const mongoose = require("mongoose");
const visitSchema = new mongoose.Schema({
    visitName: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    image: { type: String,default:null},
    location: { type: String, required: true },
    price: { type: Number},
    rate: { type: Number},
    counter: { type: Number},
    deleted: { type: Boolean, default: false },
}, {
    timestamps: true
});
const VisitPlace = mongoose.model("VisitPlace", visitSchema);

module.exports = VisitPlace;