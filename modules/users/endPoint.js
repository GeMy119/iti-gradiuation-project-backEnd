const GET_USER = "user:GET_USER";
const UPDATE_PROFILE = "user:UPDATE_PROFILE";
const SOFT_DELETE_USER = "user:SOFT_DELETE_USER";
const UN_DELETE_USER = "user:UN_DELETE_USER";
const DELETE_USER = "user:DELETE_USER";
const GET_ALL_USERS = "user:GET_ALL_USERS";
const GET_ALL_USERS_DELETED = "user:GET_ALL_USERS_DELETED";
const ADD_HOTEL_ID = "user:ADD_HOTEL_ID";
const ADD_RES_ID = "user:ADD_RES_ID";
const ADD_EVENT_ID = "user:GET_ALL_USERS_DELETED";
const ADD_CAR_ID = "user:ADD_CAR_ID";
const ADD_VISITPLACE_ID = "user:ADD_VISITPLACE_ID";
const RESERT_PASSWORD = "user:RESET_PASSWORD";
const ADD_NEW_ADMIN = "admin:ADD_NEW_ADMIN"
const REMOVE_ADMIN = "admin:REMOVE_ADMIN"
const GET_ALL_ADMINS = "admin:GET_ALL_ADMINS"
const UPLOAD_IMAGE_PROFILE = "admin:UPLOAD_IMAGE_PROFILE"


module.exports = {
    GET_ALL_USERS,
    GET_USER, UPDATE_PROFILE,
    SOFT_DELETE_USER,
    DELETE_USER,
    RESERT_PASSWORD,
    GET_ALL_USERS_DELETED,
    ADD_NEW_ADMIN,
    REMOVE_ADMIN,
    GET_ALL_ADMINS,
    UN_DELETE_USER,
    ADD_CAR_ID,
    ADD_EVENT_ID,
    ADD_HOTEL_ID,
    ADD_RES_ID,
    ADD_VISITPLACE_ID,
    UPLOAD_IMAGE_PROFILE
}