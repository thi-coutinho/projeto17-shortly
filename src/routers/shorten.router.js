import { Router } from "express";
import shortenUrl from "../controllers/shorten.controller.js";
import { authValidation } from "../middlewares/auth.middleware.js";
import { validateSchema } from "../middlewares/schema.middleware.js";
import { urlSchema } from "../schemas/url.schema.js";

const shortenRouter = Router()

shortenRouter.post("/urls/shorten",authValidation,validateSchema(urlSchema),shortenUrl)

export default shortenRouter
