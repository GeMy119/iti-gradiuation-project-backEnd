const express = require("express")
const { addCar, updateCar, deleteCar, getallCar, getSoftDeleteCar, getCar, softdeleteCar, unDeleteCar, searchCar, setCarRate } = require("./controller");
const isAuthoraized = require("../../config/isAuthoraized");
const { GET_Car, getall_Car, update_Car, delete_Car, getSoftDelete_Car, softdelete_Car, add_Car, undelete_Car, Add_Reserve_Car } = require("./endpoint");
const uploadImage = require("../../config/upload");
const { getAllCarReservations, createCarReservation } = require("./reserveCar.controller");
const carRouts = express.Router();

carRouts.post("/addCar", uploadImage.single("image"), isAuthoraized(add_Car), addCar)
carRouts.patch("/updateCar/:id", uploadImage.single("image"), isAuthoraized(update_Car), updateCar)
carRouts.patch("/unDeleteCar/:id", unDeleteCar)
carRouts.delete("/deleteCar/:id", isAuthoraized(delete_Car), deleteCar)
carRouts.get("/getallCar", getallCar)
carRouts.get("/getSoftDeleteCar", getSoftDeleteCar)
carRouts.get("/getCar/:id", getCar)
carRouts.get("/searchCar", searchCar)
carRouts.put("/softdeleteCar/:id", softdeleteCar)
carRouts.put("/setCarRate/:id", setCarRate)
// Endpoint to create a new reservation
carRouts.post('/createCarReservation', isAuthoraized(Add_Reserve_Car), createCarReservation);
// Endpoint to get all reservations
carRouts.get('/getAllCarReservations', getAllCarReservations);
//export default visitRouts;
module.exports = carRouts