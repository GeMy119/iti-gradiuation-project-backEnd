
const express = require("express")
const { addHotel, updateHotel, deleteHotel, getallHotels, getHotel, softdeleteHotel, getSoftDeleteHotels, uploadImageHotel, unDeleteHotel, searchHotel } = require("./controller");
const isAuthoraized = require("../../config/isAuthoraized");
const { GET_Hotel, getall_Hotel, add_Hotel, update_Hotel, delete_Hotel, getSoftDelete_Hotel, softdelete_Hotel, undelete_Hotel } = require("./endpoint");
const uploadImage = require("../../config/upload");
//import { addvisitplace } from './controller';


const hotelRouts = express.Router();

// hotelRouts.post("/addHotel", isAuthoraized(add_Hotel), upload.single("image"),addHotel)
hotelRouts.post("/addHotel", uploadImage, isAuthoraized(add_Hotel), addHotel)
hotelRouts.put("/uploadImageHotel/:hotelId",uploadImage, uploadImageHotel)
hotelRouts.patch("/updateHotel/:id", isAuthoraized(update_Hotel), updateHotel)
hotelRouts.delete("/deleteHotel/:id", isAuthoraized(delete_Hotel), deleteHotel)
hotelRouts.get("/getallHotels" ,getallHotels)
hotelRouts.get("/getSoftDeleteHotels", isAuthoraized(getSoftDelete_Hotel), getSoftDeleteHotels)
hotelRouts.get("/getHotel/:id", isAuthoraized(GET_Hotel), getHotel)
hotelRouts.get("/searchHotel", searchHotel)
hotelRouts.put("/softdeleteHotel/:id", softdeleteHotel)
hotelRouts.put("/unDeleteHotel/:id",isAuthoraized(undelete_Hotel) ,unDeleteHotel)
//export default visitRouts;
module.exports = hotelRouts