import { Router } from "express";
import salesController from "../controllers/salesController.js";

const salesRouter = Router()

salesRouter.get("/", salesController.ListSales)
salesRouter.post("/new", salesController.AddNewSale)
salesRouter.get("/:id", salesController.GetSpecificSalesData)
salesRouter.delete("/:id", salesController.DeleteSale);

export default salesRouter;
