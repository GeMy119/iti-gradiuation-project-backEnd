
const express  = require("express")
const {addEvent ,updateEvent, deleteEvent,getallEvnets,getEvent,softdeleteEvent, getSoftDeleteEvent}  = require("./controller");
const { GET_Event, getall_Event, add_Event, update_Event, delete_Event, getSoftDelete_Event, softdelete_Event } = require("./endpoint");
const isAuthoraized = require("../../config/isAuthoraized");
// const isAuthoraized = require("../../config/isAuthoraized");
//import { addvisitplace } from './controller';


const EventRouts = express.Router();

EventRouts.post("/addEvent",isAuthoraized(add_Event), addEvent)
EventRouts.patch("/updateEvent/:id",isAuthoraized(update_Event), updateEvent)
EventRouts.delete("/deleteEvent/:id",isAuthoraized(delete_Event), deleteEvent)
EventRouts.get("/getallEvents",isAuthoraized(getall_Event), getallEvnets)
EventRouts.get("/getSoftDeleteEvents",isAuthoraized(getSoftDelete_Event),getSoftDeleteEvent)
EventRouts.get("/getEvent/:id",isAuthoraized(GET_Event), getEvent)
EventRouts.put("/softdeleteEvent/:id",isAuthoraized(softdelete_Event), softdeleteEvent)
//export default visitRouts;
module.exports = EventRouts