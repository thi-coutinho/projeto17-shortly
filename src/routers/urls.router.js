import { Router } from "express";
import {deleteUrl, getUrl, redirectShortUrl, shortenUrl} from "../controllers/urls.controller.js";
import { authValidation } from "../middlewares/auth.middleware.js";
import { validateSchema } from "../middlewares/schema.middleware.js";
import { urlSchema } from "../schemas/url.schema.js";

const urlsRouter = Router()

urlsRouter.post("/urls/shorten",authValidation,validateSchema(urlSchema),shortenUrl)
urlsRouter.get("/urls/:id",getUrl)
urlsRouter.get("/urls/open/:shortUrl",redirectShortUrl)
urlsRouter.delete("/urls/:id",authValidation,deleteUrl)

export default urlsRouter
