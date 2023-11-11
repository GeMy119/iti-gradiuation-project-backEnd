
const express = require("express")
const { addResturant, updateresturant, deleteresturant, getallresturant, getvisitresturant, softdeleteresturant, getSoftDeleteResturant, uploadImageResturant, searchResturant } = require("./controller");
const isAuthoraized = require("../../config/isAuthoraized");
const { GET_Resturant, getall_Resturant, add_Resturant, update_Resturant, delete_Resturant, getSoftDelete_Resturant, softdelete_Resturant, undelete_Resturant } = require("./endpoint");
const uploadImage = require("../../config/upload");



const resturantRouts = express.Router();

resturantRouts.post("/addResturant",uploadImage.single("image"),isAuthoraized(add_Resturant), addResturant)
resturantRouts.put("/updateImageResturant/:resturantId", uploadImage.single("image"), uploadImageResturant)
resturantRouts.patch("/updateresturant/:id", isAuthoraized(update_Resturant), updateresturant)
resturantRouts.delete("/deleteresturant/:id", isAuthoraized(delete_Resturant), deleteresturant)
resturantRouts.get("/getallresturant", getallresturant)
resturantRouts.get("/getSoftDeleteResturant", isAuthoraized(getSoftDelete_Resturant), getSoftDeleteResturant)
resturantRouts.get("/getresturant/:id", isAuthoraized(GET_Resturant), getvisitresturant)
resturantRouts.get("/searchResturant", searchResturant)
resturantRouts.put("/softdeleteresturant/:id", isAuthoraized(softdelete_Resturant), softdeleteresturant)
resturantRouts.put("/unDeleteresturant/:id", softdeleteresturant)
//export default visitRouts;
module.exports = resturantRouts