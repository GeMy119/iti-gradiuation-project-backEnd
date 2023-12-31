const { GET_Car, getall_Car, add_Car, update_Car, delete_Car, getSoftDelete_Car, softdelete_Car, undelete_Car, Add_Reserve_Car } = require("../../modules/car/endpoint");
const { GET_Event, getall_Event, add_Event, update_Event, delete_Event, getSoftDelete_Event, softdelete_Event, undelete_Event, Update_Reserve_Event } = require("../../modules/events/endpoint");
const { GET_Hotel, getall_Hotel, add_Hotel, update_Hotel, delete_Hotel, getSoftDelete_Hotel, softdelete_Hotel, undelete_Hotel, Add_Reserve_Hotel } = require("../../modules/hotels/endpoint");
const { GET_Resturant, getall_Resturant, add_Resturant, update_Resturant, delete_Resturant, getSoftDelete_Resturant, softdelete_Resturant, undelete_Resturant, Add_Reserve_Rest } = require("../../modules/resturant/endpoint");
const { RESERT_PASSWORD, GET_USER, GET_ALL_USERS_DELETED, GET_ALL_USERS, DELETE_USER, SOFT_DELETE_USER, UPDATE_PROFILE, UN_DELETE_USER, ADD_CAR_ID,
    ADD_EVENT_ID,
    ADD_HOTEL_ID,
    ADD_RES_ID,
    ADD_VISITPLACE_ID ,
    UPLOAD_IMAGE_PROFILE} = require("../../modules/users/endPoint");
const { softdelete_Vplace, undelete_Vplace, Add_reserve_Place } = require("../../modules/visitplace/endpoint");
const { update_Vplace } = require("../../modules/visitplace/endpoint");
const { delete_Vplace } = require("../../modules/visitplace/endpoint");
const { getSoftDelete_Vplace } = require("../../modules/visitplace/endpoint");
const { add_Vplace } = require("../../modules/visitplace/endpoint");
const { getall_Vplace } = require("../../modules/visitplace/endpoint");
const { GET_Vplace } = require("../../modules/visitplace/endpoint");


module.exports = [
    GET_USER,
    GET_ALL_USERS,
    DELETE_USER,
    GET_ALL_USERS_DELETED,
    SOFT_DELETE_USER,
    UPDATE_PROFILE,
    RESERT_PASSWORD,
    UN_DELETE_USER,
    ADD_CAR_ID,
    ADD_EVENT_ID,
    ADD_HOTEL_ID,
    ADD_RES_ID,
    ADD_VISITPLACE_ID,
    UPLOAD_IMAGE_PROFILE,

    GET_Car,
    getall_Car,
    add_Car,
    update_Car,
    delete_Car,
    getSoftDelete_Car,
    softdelete_Car,
    undelete_Car,
    Add_Reserve_Car,

    GET_Event,
    getall_Event,
    add_Event,
    update_Event,
    delete_Event,
    getSoftDelete_Event,
    softdelete_Event,
    undelete_Event,
    Update_Reserve_Event,

    GET_Hotel,
    getall_Hotel,
    add_Hotel,
    update_Hotel,
    delete_Hotel,
    getSoftDelete_Hotel,
    softdelete_Hotel,
    undelete_Hotel,
    Add_Reserve_Hotel,

    GET_Resturant,
    getall_Resturant,
    add_Resturant,
    update_Resturant,
    delete_Resturant,
    getSoftDelete_Resturant,
    softdelete_Resturant,
    undelete_Resturant,
    Add_Reserve_Rest,

    GET_Vplace,
    getall_Vplace,
    add_Vplace,
    update_Vplace,
    delete_Vplace,
    getSoftDelete_Vplace,
    softdelete_Vplace,
    undelete_Vplace,
    Add_reserve_Place
]