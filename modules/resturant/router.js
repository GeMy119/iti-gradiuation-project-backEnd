
const express  = require("express")
const {addResturant ,updateresturant, deleteresturant,getallresturant,getvisitresturant,softdeleteresturant, getSoftDeleteResturant}  = require("./controller");
const isAuthoraized = require("../../config/isAuthoraized");
const { GET_Resturant, getall_Resturant, add_Resturant, update_Resturant, delete_Resturant, getSoftDelete_Resturant, softdelete_Resturant } = require("./endpoint");
//import { addvisitplace } from './controller';


const resturantRouts = express.Router();

resturantRouts.post("/addResturant",isAuthoraized(add_Resturant), addResturant)
resturantRouts.patch("/updateresturant/:id",isAuthoraized(update_Resturant), updateresturant)
resturantRouts.delete("/deleteresturant/:id",isAuthoraized(delete_Resturant), deleteresturant)
resturantRouts.get("/getallresturant",isAuthoraized(getall_Resturant), getallresturant)
resturantRouts.get("/getSoftDeleteResturant",isAuthoraized(getSoftDelete_Resturant), getSoftDeleteResturant)
resturantRouts.get("/getresturant/:id",isAuthoraized(GET_Resturant), getvisitresturant)
resturantRouts.put("/softdeleteresturant/:id",isAuthoraized(softdelete_Resturant), softdeleteresturant)
//export default visitRouts;
module.exports = resturantRouts