import { Router } from "express";
import productController from "../controllers/productController.js";
import {validateProduct} from "../validators/newproductvalidator.js";

const productRouter = Router()

productRouter.get("/", productController.ListProducts)

productRouter.post("/new", validateProduct, productController.AddNewProduct)

productRouter.delete("/:id", productController.DeleteProduct)

productRouter.get("/:id", productController.GetProductById);
productRouter.put("/:id", productController.UpdateProduct);

export default productRouter;
