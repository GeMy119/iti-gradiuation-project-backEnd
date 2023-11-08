
const express  = require("express")
const {addHotel ,updateHotel, deleteHotel,getallHotels,getHotel,softdeleteHotel, getSoftDeleteHotels}  = require("./controller");
const isAuthoraized = require("../../config/isAuthoraized");
const { GET_Hotel, getall_Hotel, add_Hotel, update_Hotel, delete_Hotel, getSoftDelete_Hotel, softdelete_Hotel } = require("./endpoint");
//import { addvisitplace } from './controller';


const hotelRouts = express.Router();

hotelRouts.post("/addHotel",isAuthoraized(add_Hotel), addHotel)
hotelRouts.patch("/updateHotel/:id",isAuthoraized(update_Hotel), updateHotel)
hotelRouts.delete("/deleteHotel/:id",isAuthoraized(delete_Hotel), deleteHotel)
hotelRouts.get("/getallHotels",isAuthoraized(getall_Hotel), getallHotels)
hotelRouts.get("/getSoftDeleteHotels",isAuthoraized(getSoftDelete_Hotel), getSoftDeleteHotels)
hotelRouts.get("/getHotel/:id",isAuthoraized(GET_Hotel), getHotel)
hotelRouts.put("/softdeleteHotel/:id",isAuthoraized(softdelete_Hotel), softdeleteHotel)
//export default visitRouts;
module.exports = hotelRouts