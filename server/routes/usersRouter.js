import { Router } from "express";
import usersController from "../controllers/usersController.js";

const usersRouter = Router()

usersRouter.get("/", usersController.ListUsers)
usersRouter.put("/", usersController.TestReturnFunction)

export default usersRouter;