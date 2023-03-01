import { Router } from "express";
import { getUserData, getUsersRanking } from "../controllers/users.controller.js";
import { authValidation } from "../middlewares/auth.middleware.js";

const usersDataRouter = Router()

usersDataRouter.get("/users/me", authValidation, getUserData)
usersDataRouter.get("/ranking", getUsersRanking)

export default usersDataRouter
