
const express  = require("express")
const { addCar, updateCar, deleteCar, getallCar, getSoftDeleteCar, getCar, softdeleteCar }  = require("./controller");
const isAuthoraized = require("../../config/isAuthoraized");
const { GET_Car, getall_Car, update_Car, delete_Car, getSoftDelete_Car, softdelete_Car, add_Car } = require("./endpoint");
//import { addvisitplace } from './controller';


const carRouts = express.Router();

carRouts.post("/addCar",isAuthoraized(add_Car), addCar)
carRouts.patch("/updateCar/:id",isAuthoraized(update_Car), updateCar)
carRouts.delete("/deleteCar/:id",isAuthoraized(delete_Car), deleteCar)
carRouts.get("/getallCar", isAuthoraized(getall_Car), getallCar)
carRouts.get("/getSoftDeleteCar", isAuthoraized(getSoftDelete_Car),getSoftDeleteCar)
carRouts.get("/getCar/:id", isAuthoraized(GET_Car) , getCar)
carRouts.put("/softdeleteCar/:id",isAuthoraized(softdelete_Car) , softdeleteCar)
//export default visitRouts;
module.exports = carRouts