import { body, validationResult } from "express-validator";
import dbQueries from "../db/queries.js"

function TestReturnFunction (req, res) {
    res.send("Test Return")
}

async function AddNewProduct (req, res) {
    console.log(req.body)
    await dbQueries.insertProduct(req.body);
    console.log("Item Added");
    res.redirect("/")
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
    ListProducts
};