const { GET_Car, getall_Car, add_Car, update_Car, delete_Car, getSoftDelete_Car, softdelete_Car, undelete_Car } = require("../../modules/car/endpoint");
const { GET_Event, getall_Event, add_Event, update_Event, delete_Event, getSoftDelete_Event, softdelete_Event, undelete_Event } = require("../../modules/events/endpoint");
const { GET_Hotel, getall_Hotel, add_Hotel, update_Hotel, delete_Hotel, getSoftDelete_Hotel, softdelete_Hotel, undelete_Hotel } = require("../../modules/hotels/endpoint");
const { GET_Resturant, getall_Resturant, add_Resturant, update_Resturant, delete_Resturant, getSoftDelete_Resturant, softdelete_Resturant, undelete_Resturant } = require("../../modules/resturant/endpoint");
const {
    ADD_NEW_ADMIN,
    REMOVE_ADMIN,
    GET_ALL_ADMINS,
    GET_USER,
    GET_ALL_USERS,
    DELETE_USER,
    SOFT_DELETE_USER,
    GET_ALL_USERS_DELETED,
    UPDATE_PROFILE,
    RESERT_PASSWORD,
    UN_DELETE_USER,
    ADD_EVENT_ID,
    ADD_HOTEL_ID,
    ADD_RES_ID,
    ADD_VISITPLACE_ID
} = require("../../modules/users/endPoint");
const { softdelete_Vplace, undelete_Vplace } = require("../../modules/visitplace/endpoint");
const { update_Vplace } = require("../../modules/visitplace/endpoint");
const { delete_Vplace } = require("../../modules/visitplace/endpoint");
const { getSoftDelete_Vplace } = require("../../modules/visitplace/endpoint");
const { add_Vplace } = require("../../modules/visitplace/endpoint");
const { getall_Vplace } = require("../../modules/visitplace/endpoint");
const { GET_Vplace } = require("../../modules/visitplace/endpoint");

module.exports = [
    ADD_NEW_ADMIN,
    REMOVE_ADMIN,
    GET_ALL_ADMINS,
    GET_USER,
    GET_ALL_USERS,
    GET_ALL_USERS_DELETED,
    DELETE_USER,
    SOFT_DELETE_USER,
    UPDATE_PROFILE,
    RESERT_PASSWORD,
    UN_DELETE_USER,
    ADD_EVENT_ID,
    ADD_HOTEL_ID,
    ADD_RES_ID,
    ADD_VISITPLACE_ID,

    GET_Car,
    getall_Car,
    add_Car,
    update_Car,
    delete_Car,
    getSoftDelete_Car,
    softdelete_Car,
    undelete_Car,

    GET_Event,
    getall_Event,
    add_Event,
    update_Event,
    delete_Event,
    getSoftDelete_Event,
    softdelete_Event,
    undelete_Event,

    GET_Hotel,
    getall_Hotel,
    add_Hotel,
    update_Hotel,
    delete_Hotel,
    getSoftDelete_Hotel,
    softdelete_Hotel,
    undelete_Hotel,

    GET_Resturant,
    getall_Resturant,
    add_Resturant,
    update_Resturant,
    delete_Resturant,
    getSoftDelete_Resturant,
    softdelete_Resturant,
    undelete_Resturant,

    GET_Vplace,
    getall_Vplace,
    add_Vplace,
    update_Vplace,
    delete_Vplace,
    getSoftDelete_Vplace,
    softdelete_Vplace,
    undelete_Vplace
]