import { create } from "domain";
import { Router } from "express";
import productController from "../controllers/productController.js";

const productRouter = Router()

productRouter.get("/", productController.ListProducts)

productRouter.post("/new", productController.AddNewProduct)

export default productRouter;
