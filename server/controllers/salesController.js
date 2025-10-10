import { body, validationResult } from "express-validator";
import dbQueries from "../db/salesqueries.js"

function TestReturnFunction (req, res) {
    res.send("Test Return")
}

async function ListSales (req, res) {
    const sales = await dbQueries.getAllSales();
    res.json(sales);
}

async function AddNewSale (req, res) {
    try {
            console.log(req.body);
            
            await dbQueries.insertSale(req.body);
            console.log("Item Added");
            
            res.status(201).json({ message: "Sale added successfully" });
        } catch (error) {
            console.error("Error adding Sale:", error);
            res.status(500).json({ error: error.message });
        }
}

async function DeleteSale(req, res) {
    try {
        const { id } = req.params;
        await dbQueries.deleteSale(id);
        res.status(200).json({ message: "Sale deleted successfully" });
    } catch (error) {
        console.error("Error deleting sale:", error);
        res.status(500).json({ error: error.message });
    }
}

async function GetSpecificSalesData(req, res){
    try{    
        const { id } = req.params;
        const salesData = await dbQueries.GetSpecificSalesData(id);
        res.status(200).json(salesData);
    } catch (error) {
        console.error(`Error getting sales data for ${id}`, error);
        res.status(404).json({error: error.message});
    }
}

export default {
    ListSales,
    AddNewSale,
    DeleteSale,
    TestReturnFunction,
    GetSpecificSalesData,
};