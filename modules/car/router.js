const express = require("express")
const { addCar, updateCar, deleteCar, getallCar, getSoftDeleteCar, getCar, softdeleteCar, uploadImageCar, unDeleteCar, searchCar } = require("./controller");
const isAuthoraized = require("../../config/isAuthoraized");
const { GET_Car, getall_Car, update_Car, delete_Car, getSoftDelete_Car, softdelete_Car, add_Car, undelete_Car } = require("./endpoint");
const upload = require("../../config/upload");
const carRouts = express.Router();

carRouts.post("/addCar", upload.single("image"), isAuthoraized(add_Car), addCar)
carRouts.put("/updaateCarImage/:carId", upload.single("image"), uploadImageCar)
carRouts.patch("/updateCar/:id", isAuthoraized(update_Car), updateCar)
carRouts.patch("/unDeleteCar/:id", isAuthoraized(undelete_Car), unDeleteCar)
carRouts.delete("/deleteCar/:id", isAuthoraized(delete_Car), deleteCar)
carRouts.get("/getallCar", isAuthoraized(getall_Car), getallCar)
carRouts.get("/getSoftDeleteCar", isAuthoraized(getSoftDelete_Car), getSoftDeleteCar)
carRouts.get("/getCar/:id", isAuthoraized(GET_Car), getCar)
carRouts.get("/searchCar",searchCar)
carRouts.put("/softdeleteCar/:id", softdeleteCar)
//export default visitRouts;
module.exports = carRouts