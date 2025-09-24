import { Router } from "express";
import settingsController from "../controllers/settingsController.js";

const settingsRouter = Router()

settingsRouter.get("/settings", settingsController.TestReturnFunction)



export default settingsRouter;
