import { Router } from "express";
import { body } from "express-validator";
import usersController from "../controllers/usersController.js";

const usersRouter = Router()

usersRouter.get("/", usersController.ListUsers)
usersRouter.delete("/:username", usersController.DeleteUser) 

usersRouter.post("/", 
    body("username").trim().isLength({ min: 3 }).withMessage("Username must be at least 3 characters"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
    usersController.CreateUser
)

usersRouter.put("/", usersController.TestReturnFunction)

export default usersRouter;