import { Router } from "express";
import settingsController from "../controllers/settingsController.js";

const settingsRouter = Router()

settingsRouter.get("/", settingsController.ListSettings)
settingsRouter.put("/", settingsController.UpdateSettings)



export default settingsRouter;
