const { GET_Car, getall_Car } = require("../../modules/car/endpoint");
const { GET_Event, getall_Event } = require("../../modules/events/endpoint");
const { GET_Hotel, getall_Hotel } = require("../../modules/hotels/endpoint");
const { getall_Resturant, GET_Resturant } = require("../../modules/resturant/endpoint");
const { GET_USER, UPDATE_PROFILE,RESERT_PASSWORD } = require("../../modules/users/endPoint");
const { getall_Vplace } = require("../../modules/visitplace/endpoint");
const { GET_Vplace } = require("../../modules/visitplace/endpoint");

module.exports = [GET_USER, UPDATE_PROFILE,RESERT_PASSWORD,
    GET_Car,
    getall_Car,
    GET_Event,
    getall_Event,
    GET_Hotel,
    getall_Hotel,
    GET_Resturant,
    getall_Resturant,
    GET_Vplace,
    getall_Vplace
]