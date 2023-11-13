
const express = require("express")
const { addResturant, updateresturant, deleteresturant, getallresturant, getvisitresturant, softdeleteresturant, getSoftDeleteResturant, searchResturant, unDeleteresturant, setRestRate } = require("./controller");
const isAuthoraized = require("../../config/isAuthoraized");
const { GET_Resturant, getall_Resturant, add_Resturant, update_Resturant, delete_Resturant, getSoftDelete_Resturant, softdelete_Resturant, undelete_Resturant, Add_Reserve_Rest } = require("./endpoint");
const uploadImage = require("../../config/upload");
const { getAllRestReserv, createRestReserve } = require("./reservRest.controller");



const resturantRouts = express.Router();

resturantRouts.post("/addResturant", uploadImage.single("image"), isAuthoraized(add_Resturant), addResturant)
resturantRouts.patch("/updateresturant/:id", uploadImage.single("image"), isAuthoraized(update_Resturant), updateresturant)
resturantRouts.delete("/deleteresturant/:id", isAuthoraized(delete_Resturant), deleteresturant)
resturantRouts.get("/getallresturant", getallresturant)
resturantRouts.get("/getSoftDeleteResturant", getSoftDeleteResturant)
resturantRouts.get("/getresturant/:id", getvisitresturant)
resturantRouts.get("/searchResturant", searchResturant)
resturantRouts.put("/softdeleteresturant/:id", softdeleteresturant)
resturantRouts.put("/unDeleteresturant/:id", unDeleteresturant)
resturantRouts.put("/setRestRate/:id", setRestRate)
// Endpoint to create a new reservation
hotelRouts.post('/createRestReserve', isAuthoraized(Add_Reserve_Rest), createRestReserve);
// Endpoint to get all reservations
hotelRouts.get('/getAllRestReserv', getAllRestReserv);
//export default visitRouts;
module.exports = resturantRouts