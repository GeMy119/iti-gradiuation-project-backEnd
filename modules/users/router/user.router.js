const validateRequest = require("../../../config/validation")
const { register, login } = require("../controller/auth.controller")
const { updateUser, getUser } = require("../controller/crud.controller")
const { registerSchema, loginSchema } = require("../joi/user.joi")

const userRouter = require("express").Router()


userRouter.post("/user/register", validateRequest(registerSchema), register)
userRouter.post("/user/login",validateRequest(loginSchema), login)
userRouter.put("/user/update/:userId", updateUser)
userRouter.get("/user/get/:userId", getUser)


module.exports = userRouter