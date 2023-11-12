
const express = require("express")
const { addHotel, updateHotel, deleteHotel, getallHotels, getHotel, softdeleteHotel, getSoftDeleteHotels, uploadImageHotel, unDeleteHotel, searchHotel } = require("./controller");
const isAuthoraized = require("../../config/isAuthoraized");
const { GET_Hotel, getall_Hotel, add_Hotel, update_Hotel, delete_Hotel, getSoftDelete_Hotel, softdelete_Hotel, undelete_Hotel } = require("./endpoint");
const uploadImage = require("../../config/upload");



const hotelRouts = express.Router();
hotelRouts.post("/addHotel", uploadImage.single("image"), isAuthoraized(add_Hotel), addHotel)
hotelRouts.patch("/updateHotel/:id",uploadImage.single("image") ,isAuthoraized(update_Hotel), updateHotel)
hotelRouts.delete("/deleteHotel/:id", isAuthoraized(delete_Hotel), deleteHotel)
hotelRouts.get("/getallHotels", getallHotels)
hotelRouts.get("/getSoftDeleteHotels", isAuthoraized(getSoftDelete_Hotel), getSoftDeleteHotels)
hotelRouts.get("/getHotel/:id", getHotel)
hotelRouts.get("/searchHotel", searchHotel)
hotelRouts.put("/softdeleteHotel/:id", softdeleteHotel)
hotelRouts.put("/unDeleteHotel/:id", unDeleteHotel)
//export default visitRouts;
module.exports = hotelRouts