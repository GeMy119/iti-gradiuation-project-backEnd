const userRouter = require("express").Router();

// const { isAuthorized } = require("../../../config/isAuthorized");
const  validateRequest  = require("../../../config/validation");
const { GET_USER, UPDATE_PROFILE, GET_ALL_USERS, GET_ALL_USERS_DELETED, SOFT_DELETE_USER, DELETE_USER, RESET_PASSWORD, REMOVE_ADMIN, ADD_NEW_ADMIN, GET_ALL_ADMINS } = require("../endPoint");
const { register, login, resetPassword } = require("../controller/auth.controller");
const { getUser, updateProfile, getAllUsers, deleteSoftUser, deleteUser, getAllUsersDeleted, addNewAdmin, removeAdmin, getAllAdmins } = require("../controller/crud.controller");
const { addCarId, addEventId, addHotelId, addRestaurantId, addVisitPlaceId } = require("../controller/services.controller");
const { registerSchema, loginSchema, resetPasswordSchema, addIdSchema, addNewAdminAndRemoveAdmin } = require("../joi/user.joi");
const isAuthoraized = require("../../../config/isAuthoraized");

// Auth routes
userRouter.post("/user/register", validateRequest(registerSchema), register);
userRouter.post("/user/login", validateRequest(loginSchema), login);
userRouter.put("/user/resetPassword", isAuthoraized(RESET_PASSWORD), validateRequest(resetPasswordSchema), resetPassword);

// User management routes
userRouter.get("/user/get/:userId", isAuthoraized(GET_USER), getUser);
userRouter.put("/user/update/:userId", isAuthoraized(UPDATE_PROFILE), updateProfile);
userRouter.get("/getAllUsers", isAuthoraized(GET_ALL_USERS), getAllUsers);
userRouter.get("/getAllUsers", isAuthoraized(GET_ALL_USERS_DELETED), getAllUsersDeleted);
userRouter.put("/user/softDelete/:userId", isAuthoraized(SOFT_DELETE_USER), deleteSoftUser);
userRouter.delete("/user/delete/:userId", isAuthoraized(DELETE_USER), deleteUser);

// Service-related routes
userRouter.post('/add-car-id', validateRequest(addIdSchema), addCarId);
userRouter.post('/add-event-id', validateRequest(addIdSchema), addEventId);
userRouter.post('/add-hotel-id', validateRequest(addIdSchema), addHotelId);
userRouter.post('/add-restaurant-id', validateRequest(addIdSchema), addRestaurantId);
userRouter.post('/add-visit-place-id', validateRequest(addIdSchema), addVisitPlaceId);
// Route to add a new admin
userRouter.post('/admin/add', validateRequest(addNewAdminAndRemoveAdmin), isAuthoraized(ADD_NEW_ADMIN), addNewAdmin);
// Route to remove admin role
userRouter.post('/admin/remove', validateRequest(addNewAdminAndRemoveAdmin), isAuthoraized(REMOVE_ADMIN), removeAdmin);
// Route to get all admins
userRouter.get('/admin/all', isAuthoraized(GET_ALL_ADMINS), getAllAdmins);


module.exports = userRouter;
