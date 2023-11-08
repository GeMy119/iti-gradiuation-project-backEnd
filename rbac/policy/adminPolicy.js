const { GET_Car, getall_Car, add_Car, update_Car, delete_Car, getSoftDelete_Car, softdelete_Car } = require("../../modules/car/endpoint");
const { GET_Event, getall_Event, add_Event, update_Event, delete_Event, getSoftDelete_Event, softdelete_Event } = require("../../modules/events/endpoint");
const { GET_Hotel, getall_Hotel, add_Hotel, update_Hotel, delete_Hotel, getSoftDelete_Hotel, softdelete_Hotel } = require("../../modules/hotels/endpoint");
const { GET_Resturant, getall_Resturant, add_Resturant, update_Resturant, delete_Resturant, getSoftDelete_Resturant, softdelete_Resturant } = require("../../modules/resturant/endpoint");
const {RESERT_PASSWORD, GET_USER, GET_ALL_USERS_DELETED,GET_ALL_USERS, DELETE_USER, SOFT_DELETE_USER, UPDATE_PROFILE } = require("../../modules/users/endPoint");
const { softdelete_Vplace } = require("../../modules/visitplace/endpoint");
const { update_Vplace } = require("../../modules/visitplace/endpoint");
const { delete_Vplace } = require("../../modules/visitplace/endpoint");
const { getSoftDelete_Vplace } = require("../../modules/visitplace/endpoint");
const { add_Vplace } = require("../../modules/visitplace/endpoint");
const { getall_Vplace } = require("../../modules/visitplace/endpoint");
const { GET_Vplace } = require("../../modules/visitplace/endpoint");


module.exports = [GET_USER, GET_ALL_USERS, DELETE_USER, GET_ALL_USERS_DELETED,SOFT_DELETE_USER, UPDATE_PROFILE,RESERT_PASSWORD,GET_Car,
    getall_Car,
    add_Car,
    update_Car,
    delete_Car,
    getSoftDelete_Car,
    softdelete_Car,

    GET_Event,
    getall_Event,
    add_Event,
    update_Event,
    delete_Event,
    getSoftDelete_Event,
    softdelete_Event,

    GET_Hotel,
    getall_Hotel,
    add_Hotel,
    update_Hotel,
    delete_Hotel,
    getSoftDelete_Hotel,
    softdelete_Hotel,

    GET_Resturant,
    getall_Resturant,
    add_Resturant,
    update_Resturant,
    delete_Resturant,
    getSoftDelete_Resturant,
    softdelete_Resturant,

    GET_Vplace,
    getall_Vplace,
    add_Vplace,
    update_Vplace,
    delete_Vplace,
    getSoftDelete_Vplace,
    softdelete_Vplace
]