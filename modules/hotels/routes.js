const express = require("express")
const { addHotel, updateHotel, deleteHotel, getallHotels, getHotel, softdeleteHotel, getSoftDeleteHotels, unDeleteHotel, searchHotel, setHotelRate } = require("./controller");
const isAuthoraized = require("../../config/isAuthoraized");
const { GET_Hotel, getall_Hotel, add_Hotel, update_Hotel,
     delete_Hotel, getSoftDelete_Hotel, softdelete_Hotel, undelete_Hotel, Add_Reserve_Hotel } = require("./endpoint");
const uploadImage = require("../../config/upload");
const { createReservation, getAllReservations, updateReservationStatus } = require("./resirveHoter.controller");



const hotelRouts = express.Router();
hotelRouts.post("/addHotel", uploadImage.single("image"), isAuthoraized(add_Hotel), addHotel)
hotelRouts.patch("/updateHotel/:id", uploadImage.single("image"), isAuthoraized(update_Hotel), updateHotel)
hotelRouts.delete("/deleteHotel/:id", isAuthoraized(delete_Hotel), deleteHotel)
hotelRouts.get("/getallHotels", getallHotels)
hotelRouts.get("/getSoftDeleteHotels", isAuthoraized(getSoftDelete_Hotel), getSoftDeleteHotels)
hotelRouts.get("/getHotel/:id", getHotel)
hotelRouts.get("/searchHotel", searchHotel)
hotelRouts.put("/softdeleteHotel/:id", softdeleteHotel)
hotelRouts.put("/unDeleteHotel/:id", unDeleteHotel)
hotelRouts.put("/setHotelRate/:id", setHotelRate)
hotelRouts.put("/updateReservationStatus/:id", updateReservationStatus)
// Endpoint to create a new reservation
hotelRouts.post('/addReservations', isAuthoraized(Add_Reserve_Hotel), createReservation);
// Endpoint to get all reservations
hotelRouts.get('/getReservations', getAllReservations);
module.exports = hotelRouts