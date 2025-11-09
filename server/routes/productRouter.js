import { Router } from "express";
import productController from "../controllers/productController.js";
//import {validateProduct} from "../validators/newproductvalidator.js";

const productRouter = Router()

productRouter.get("/", productController.ListProducts)

productRouter.post("/new", productController.AddNewProduct)

productRouter.get("/:id", productController.GetProductById);
productRouter.put("/:id", productController.UpdateProduct);

productRouter.patch("/:id/wix-id", productController.UpdateProductWixId);

export default productRouter;
