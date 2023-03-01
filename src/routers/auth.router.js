import { Router } from "express";
import { signIn, signUp } from "../controllers/auth.controller.js";
import { validateSchema } from "../middlewares/schema.middleware.js";
import { loginSchema, userSchema } from "../schemas/auth.schema.js";

const authRouter = Router()

authRouter.post("/signin",validateSchema(loginSchema),signIn)
authRouter.post("/signup",validateSchema(userSchema),signUp)

export default authRouter