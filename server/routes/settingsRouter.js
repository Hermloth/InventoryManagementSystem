import { Router } from "express";
import settingsController from "../controllers/settingsController.js";

const settingsRouter = Router()

settingsRouter.get("/", settingsController.ListSettings)



export default settingsRouter;
