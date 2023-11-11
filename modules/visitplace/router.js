
const express = require("express")
const { addvisitplace, updatevisitplace, deletevisitplace, getallvisitplace, getvisitplace, softdeletePlace, getSoftDelete, uploadImageVisitPlace, searchVisitPlace, unDeletePlace } = require("./controller");
const isAuthoraized = require("../../config/isAuthoraized");
const { GET_Vplace, undelete_Vplace, getall_Vplace, add_Vplace, update_Vplace, delete_Vplace, getSoftDelete_Vplace, softdelete_Vplace } = require("./endpoint");
// const upload = require("../../config/upload");
const uploadImage = require("../../config/upload");
//import { addvisitplace } from './controller';


const visitRouts = express.Router();

visitRouts.post("/addvisitplace", uploadImage, isAuthoraized(add_Vplace), addvisitplace)
visitRouts.post("/uploadImageVisitPlace/:visitPlaceId", uploadImage, uploadImageVisitPlace)
visitRouts.patch("/updatevisitplace/:id", isAuthoraized(update_Vplace), updatevisitplace)
visitRouts.delete("/deletevisitplace/:id", isAuthoraized(delete_Vplace), deletevisitplace)
visitRouts.get("/getallvisitplace",getallvisitplace)
visitRouts.get("/getSoftDeletePlaces", isAuthoraized(getSoftDelete_Vplace), getSoftDelete)
visitRouts.get("/getvisitplace/:id", isAuthoraized(GET_Vplace), getvisitplace)
visitRouts.get("searchVisitPlace", searchVisitPlace)
visitRouts.put("/softdeletePlace/:id", isAuthoraized(softdelete_Vplace), softdeletePlace)
visitRouts.put("/unDeletePlace/:id", isAuthoraized(undelete_Vplace), unDeletePlace)
//export default visitRouts;
module.exports = visitRouts