import { Router } from "express";
import purchasesController from "../controllers/purchasesController.js";

const purchasesRouter = Router()

purchasesRouter.get("/", purchasesController.ListPurchases)
purchasesRouter.post("/new", purchasesController.AddNewPurchase)
purchasesRouter.get("/:id", purchasesController.GetSpecificPurchaseData)
purchasesRouter.delete("/:id", purchasesController.DeletePurchase);


export default purchasesRouter;
