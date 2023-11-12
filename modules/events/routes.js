
const express = require("express")
const { addEvent, updateEvent, deleteEvent, getallEvnets, getEvent, softdeleteEvent, getSoftDeleteEvent, uploadImageEvent, unDeleteEvent, searchEvent } = require("./controller");
const { GET_Event, getall_Event, add_Event, update_Event, delete_Event, getSoftDelete_Event, softdelete_Event, undelete_Event } = require("./endpoint");
const isAuthoraized = require("../../config/isAuthoraized");
const uploadImage = require("../../config/upload");



const EventRouts = express.Router();

EventRouts.post("/addEvent", uploadImage.single("image"), isAuthoraized(add_Event), addEvent)
EventRouts.patch("/updateEvent/:id", uploadImage.single("image"), isAuthoraized(update_Event), updateEvent)
EventRouts.delete("/deleteEvent/:id", isAuthoraized(delete_Event), deleteEvent)
EventRouts.get("/getallEvents", getallEvnets)
EventRouts.get("/getSoftDeleteEvents", isAuthoraized(getSoftDelete_Event), getSoftDeleteEvent)
EventRouts.get("/getEvent/:id", getEvent)
EventRouts.get("/searchEvent", searchEvent)
EventRouts.put("/softdeleteEvent/:id", softdeleteEvent)
EventRouts.put("/unDeleteEvent/:id", unDeleteEvent)
//export default visitRouts;
module.exports = EventRouts