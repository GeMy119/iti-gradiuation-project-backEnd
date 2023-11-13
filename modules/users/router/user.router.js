const userRouter = require("express").Router();


const validateRequest = require("../../../config/validation");
const { GET_USER, UPDATE_PROFILE, GET_ALL_USERS, GET_ALL_USERS_DELETED, SOFT_DELETE_USER, DELETE_USER, RESET_PASSWORD, REMOVE_ADMIN, ADD_NEW_ADMIN, GET_ALL_ADMINS, UN_DELETE_USER, ADD_CAR_ID, ADD_EVENT_ID, ADD_HOTEL_ID, ADD_RES_ID, ADD_VISITPLACE_ID, UPLOAD_IMAGE_PROFILE } = require("../endPoint");
const { register, login, resetPassword, verifyAccount } = require("../controller/auth.controller");
const { getUser, updateProfile, getAllUsers, deleteSoftUser, deleteUser, getAllUsersDeleted, addNewAdmin, removeAdmin, getAllAdmins, uploadImageProfile, unDeleteUser, searchUser } = require("../controller/crud.controller");
const { addCarId, addEventId, addHotelId, addVisitPlaceId, addResId } = require("../controller/services.controller");
const { registerSchema, loginSchema, resetPasswordSchema, addIdSchema, addNewAdminAndRemoveAdmin } = require("../joi/user.joi");
const isAuthoraized = require("../../../config/isAuthoraized");
const uploadImage = require("../../../config/upload");


// Auth routes
userRouter.post("/user/register", validateRequest(registerSchema), register);
userRouter.post("/user/login", validateRequest(loginSchema), login);
userRouter.put("/verifyAccount/:token", verifyAccount);
userRouter.put("/user/resetPassword/:id", validateRequest(resetPasswordSchema), resetPassword);

// User management routes
userRouter.get("/user/get", isAuthoraized(GET_USER), getUser);
userRouter.put("/user/update", isAuthoraized(UPDATE_PROFILE), updateProfile);
userRouter.put("/user/profileImage", uploadImage.single("image"), isAuthoraized(UPLOAD_IMAGE_PROFILE), uploadImageProfile);
userRouter.get("/getAllUsers", isAuthoraized(GET_ALL_USERS), getAllUsers);
userRouter.get("/getAllUsersDeleted", isAuthoraized(GET_ALL_USERS_DELETED), getAllUsersDeleted);
userRouter.get("/searchUser", searchUser);
userRouter.put("/user/softDelete/:userId", deleteSoftUser);
userRouter.put("/user/unDeleteUser/:userId", unDeleteUser);
userRouter.delete("/user/delete/:userId", isAuthoraized(DELETE_USER), deleteUser);
// userRouter.put("/user/image/:id", uploadImage, uploadImageProfile);


// Service-related routes
userRouter.post('/add-car-id', validateRequest(addIdSchema), isAuthoraized(ADD_CAR_ID), addCarId);
userRouter.post('/add-event-id', validateRequest(addIdSchema), isAuthoraized(ADD_EVENT_ID), addEventId);
userRouter.post('/add-hotel-id', validateRequest(addIdSchema), isAuthoraized(ADD_HOTEL_ID), addHotelId);
userRouter.post('/add-restaurant-id', validateRequest(addIdSchema), isAuthoraized(ADD_RES_ID), addResId);
userRouter.post('/add-visit-place-id', validateRequest(addIdSchema), isAuthoraized(ADD_VISITPLACE_ID), addVisitPlaceId);
// Route to add a new admin
userRouter.put('/admin/add/:id', validateRequest(addNewAdminAndRemoveAdmin), isAuthoraized(ADD_NEW_ADMIN), addNewAdmin);
// Route to remove admin role
userRouter.put('/admin/remove/:id', validateRequest(addNewAdminAndRemoveAdmin), isAuthoraized(REMOVE_ADMIN), removeAdmin);
// Route to get all admins
userRouter.get('/admin/all', isAuthoraized(GET_ALL_ADMINS), getAllAdmins);

module.exports = userRouter;