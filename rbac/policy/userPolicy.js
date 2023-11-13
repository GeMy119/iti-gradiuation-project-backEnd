const { GET_Car, getall_Car } = require("../../modules/car/endpoint");
const { GET_Event, getall_Event } = require("../../modules/events/endpoint");
const { GET_Hotel, getall_Hotel, Add_Reserve_Hotel } = require("../../modules/hotels/endpoint");
const { getall_Resturant, GET_Resturant, Add_Reserve_Rest } = require("../../modules/resturant/endpoint");
const { GET_USER, UPDATE_PROFILE, RESERT_PASSWORD, ADD_EVENT_ID,
    ADD_HOTEL_ID,
    ADD_RES_ID,
    ADD_VISITPLACE_ID, 
    UPLOAD_IMAGE_PROFILE} = require("../../modules/users/endPoint");
const { getall_Vplace } = require("../../modules/visitplace/endpoint");
const { GET_Vplace } = require("../../modules/visitplace/endpoint");

module.exports = [GET_USER, UPDATE_PROFILE, RESERT_PASSWORD,
    GET_Car,
    getall_Car,
    GET_Event,
    getall_Event,
    GET_Hotel,
    getall_Hotel,
    GET_Resturant,
    getall_Resturant,
    GET_Vplace,
    getall_Vplace,
    ADD_EVENT_ID,
    ADD_HOTEL_ID,
    ADD_RES_ID,
    ADD_VISITPLACE_ID,
    UPLOAD_IMAGE_PROFILE,
    Add_Reserve_Hotel,
    Add_Reserve_Rest
]