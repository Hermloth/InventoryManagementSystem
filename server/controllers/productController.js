import { body, validationResult } from "express-validator";
import dbQueries from "../db/queries.js"
//import myWixClient from "../utils/wixClient.js";

function TestReturnFunction (req, res) {
    res.send("Test Return")
}

async function AddNewProduct (req, res) {
    try {
            console.log(req.body);
            
            await dbQueries.insertProduct(req.body);
            console.log("Item Added");
            
            res.status(201).json({ message: "Product added successfully" });
        } catch (error) {
            console.error("Error adding product:", error);
            res.status(500).json({ error: error.message });
        }
}

async function ListProducts (req, res) {
    const products = await dbQueries.getAllProducts();
    console.log(products)
    res.json(products);
}

export default {
    TestReturnFunction,
    AddNewProduct,
    ListProducts,
};