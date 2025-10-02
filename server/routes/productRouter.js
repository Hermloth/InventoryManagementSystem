import { Router } from "express";
import productController from "../controllers/productController.js";
//import {validateProduct} from "../validators/newproductvalidator.js";

const productRouter = Router()

productRouter.get("/", productController.ListProducts)

productRouter.post("/new", productController.AddNewProduct)

//productRouter.post("/new", validateProduct, productController.AddNewProduct)

//productRouter.delete("/", productController.DeleteAllProducts);
//productRouter.delete("/:id", productController.DeleteProduct)

//productRouter.get("/:id", productController.GetProductById);
//productRouter.put("/:id", productController.UpdateProduct);

//productRouter.post("/sync-wix", productController.syncWixProductsToLocal);
//productRouter.post("/update-wix-ids", productController.updateWixIdsFromFrontend);


export default productRouter;
