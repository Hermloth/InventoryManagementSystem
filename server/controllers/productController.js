import { body, validationResult } from "express-validator";
import dbQueries from "../db/queries.js"

function TestReturnFunction (req, res) {
    res.send("Test Return")
}

async function DeleteProduct(req, res) {
    const productId = req.params.id;
    console.log("Deleting Product ID:", productId);

    try {
        const deleted = await dbQueries.deleteProduct(productId);
        if (!deleted) {
            return res.status(404).json({ message: "Product not found" });
        } else {
            res.status(200).json({ message: "Product deleted successfully" });
        }
        
    } catch (err) {
        console.error("Error in delete controller:", err.message);
        res.status(500).json({ error: "Failed to delete product" });
    }
}

async function AddNewProduct (req, res) {
    console.log(req.body)

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        console.log("Validation errors:", errors.array());
        return res.status(400).json({ errors: errors.array() });
    }

    await dbQueries.insertProduct(req.body);
        console.log("Item Added");
        res.redirect("/products")
}

async function ListProducts (req, res) {
    console.log("GET /products called");
    const products = await dbQueries.getAllProducts();
    console.log(products)
    res.json(products);
}

export default {
    TestReturnFunction,
    AddNewProduct,
    ListProducts,
    DeleteProduct
};