import { Router } from "express";
import { getUserData } from "../controllers/user.controller.js";
import { authValidation } from "../middlewares/auth.middleware.js";

const userRouter = Router()

userRouter.get("/users/me", authValidation, getUserData)

export default userRouter
