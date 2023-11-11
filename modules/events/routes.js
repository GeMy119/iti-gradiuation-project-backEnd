
const express = require("express")
const { addEvent, updateEvent, deleteEvent, getallEvnets, getEvent, softdeleteEvent, getSoftDeleteEvent, uploadImageEvent, unDeleteEvent, searchEvent } = require("./controller");
const { GET_Event, getall_Event, add_Event, update_Event, delete_Event, getSoftDelete_Event, softdelete_Event, undelete_Event } = require("./endpoint");
const isAuthoraized = require("../../config/isAuthoraized");
// const upload = require("../../config/upload");
const uploadImage = require("../../config/upload");
// const isAuthoraized = require("../../config/isAuthoraized");
//import { addvisitplace } from './controller';


const EventRouts = express.Router();

EventRouts.post("/addEvent", uploadImage,isAuthoraized(add_Event), addEvent)
EventRouts.put("/uploadImageEvent/:eventId", uploadImage, uploadImageEvent)
EventRouts.patch("/updateEvent/:id", isAuthoraized(update_Event), updateEvent)
EventRouts.delete("/deleteEvent/:id", isAuthoraized(delete_Event), deleteEvent)
EventRouts.get("/getallEvents",getallEvnets)
EventRouts.get("/getSoftDeleteEvents", isAuthoraized(getSoftDelete_Event), getSoftDeleteEvent)
EventRouts.get("/getEvent/:id", isAuthoraized(GET_Event), getEvent)
EventRouts.get("/searchEvent",searchEvent)
EventRouts.put("/softdeleteEvent/:id", softdeleteEvent)
EventRouts.put("/unDeleteEvent/:id",isAuthoraized(undelete_Event) ,unDeleteEvent)
//export default visitRouts;
module.exports = EventRouts