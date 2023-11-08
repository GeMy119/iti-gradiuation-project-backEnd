
const express  = require("express")
const {addvisitplace ,updatevisitplace, deletevisitplace,getallvisitplace,getvisitplace,softdeletePlace, getSoftDelete}  = require("./controller");
const isAuthoraized = require("../../config/isAuthoraized");
const { GET_Vplace } = require("./endpoint");
const { getall_Vplace } = require("./endpoint");
const { add_Vplace } = require("./endpoint");
const { update_Vplace } = require("./endpoint");
const { delete_Vplace } = require("./endpoint");
const { getSoftDelete_Vplace } = require("./endpoint");
const { softdelete_Vplace } = require("./endpoint");
//import { addvisitplace } from './controller';


const visitRouts = express.Router();

visitRouts.post("/addvisitplace", isAuthoraized(add_Vplace),addvisitplace)
visitRouts.patch("/updatevisitplace/:id",isAuthoraized(update_Vplace), updatevisitplace)
visitRouts.delete("/deletevisitplace/:id",isAuthoraized(delete_Vplace), deletevisitplace)
visitRouts.get("/getallvisitplace",isAuthoraized(getall_Vplace), getallvisitplace)
visitRouts.get("/getSoftDeletePlaces",isAuthoraized(getSoftDelete_Vplace), getSoftDelete)
visitRouts.get("/getvisitplace/:id",isAuthoraized(GET_Vplace), getvisitplace)
visitRouts.put("/softdeletePlace/:id",isAuthoraized(softdelete_Vplace), softdeletePlace)
//export default visitRouts;
module.exports = visitRouts