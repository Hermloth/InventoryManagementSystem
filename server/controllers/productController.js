import { body, validationResult } from "express-validator";
import dbQueries from "../db/queries.js"
import { useParams } from "react-router";

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
    res.json(products);
}

async function GetProductById(req, res){
    const {id} =req.params;
    try{const product = await dbQueries.getProductById(id);
        if(!product){
            return res.status(404).json({message: "Product Not Found"});
        }
        res.json(product)
    } catch (error){
        console.error("Error fetching product:", error)
        res.status(500).json({error: error.message})
    }
}

async function UpdateProduct(req, res){
    const {id} = req.params;
    try{
        await dbQueries.updateProduct(id, req.body);
        res.status(200).json({ message: "Product updated successfully" });
    } catch (error){
        console.error("Unable to update product", error)
        res.status(500).json({error: error.message})
    }
}

export default {
    TestReturnFunction,
    AddNewProduct,
    ListProducts,
    GetProductById,
    UpdateProduct,
};