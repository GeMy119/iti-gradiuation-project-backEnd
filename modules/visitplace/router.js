
const express = require("express")
const { addvisitplace, updateVisitPlace, deletevisitplace, getallvisitplace, getvisitplace, softdeletePlace, getSoftDelete, searchVisitPlace, unDeletePlace, setRateVisitPlace } = require("./controller");
const isAuthoraized = require("../../config/isAuthoraized");
const { GET_Vplace, undelete_Vplace, getall_Vplace, add_Vplace, update_Vplace, delete_Vplace, getSoftDelete_Vplace, softdelete_Vplace } = require("./endpoint");
const uploadImage = require("../../config/upload");



const visitRouts = express.Router();

visitRouts.post("/addvisitplace", uploadImage.single("image"), isAuthoraized(add_Vplace), addvisitplace)
visitRouts.patch("/updatevisitplace/:id", uploadImage.single("image"),isAuthoraized(update_Vplace), updateVisitPlace)
visitRouts.delete("/deletevisitplace/:id", isAuthoraized(delete_Vplace), deletevisitplace)
visitRouts.get("/getallvisitplace", getallvisitplace)
visitRouts.get("/getSoftDeletePlaces", getSoftDelete)
visitRouts.get("/getvisitplace/:id", getvisitplace)
visitRouts.get("searchVisitPlace", searchVisitPlace)
visitRouts.put("/softdeletePlace/:id", softdeletePlace)
visitRouts.put("/unDeletePlace/:id", unDeletePlace)
visitRouts.put("/setRateVisitPlace/:id", setRateVisitPlace)
//export default visitRouts;
module.exports = visitRouts