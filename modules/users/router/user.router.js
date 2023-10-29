const isAuthoraized = require("../../../config/isAuthoraized")
const validateRequest = require("../../../config/validation")
const { register, login } = require("../controller/auth.controller")
const { getUser, updateProfile, getAllUsers, deleteSoftUser, deleteUser } = require("../controller/crud.controller")
const { GET_USER, UPDATE_PROFILE, GET_ALL_USERS, SOFT_DELETE_USER, DELETE_USER } = require("../endPoint")
const { registerSchema, loginSchema } = require("../joi/user.joi")

const userRouter = require("express").Router()


userRouter.post("/user/register", validateRequest(registerSchema), register)
userRouter.post("/user/login", validateRequest(loginSchema), login)
userRouter.put("/user/update/:userId", isAuthoraized(UPDATE_PROFILE), updateProfile)
userRouter.put("/user/softDelete/:userId", isAuthoraized(SOFT_DELETE_USER), deleteSoftUser)
userRouter.delete("/user/delete/:userId", isAuthoraized(DELETE_USER), deleteUser)
userRouter.get("/user/get/:userId", isAuthoraized(GET_USER), getUser)
userRouter.get("/getAllUsers", isAuthoraized(GET_ALL_USERS), getAllUsers)


module.exports = userRouter