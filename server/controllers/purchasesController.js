import { body, validationResult } from "express-validator";
import dbQueries from "../db/purchasequeries.js"

function TestReturnFunction (req, res) {
    res.send("Test Return")
}

async function ListPurchases (req, res) {
    const purchases = await dbQueries.getAllPurchases();
    res.json(purchases);
}

async function AddNewPurchase (req, res) {
    try {
            console.log(req.body);
            
            await dbQueries.insertPurchase(req.body);
            console.log("Item Added");
            
            res.status(201).json({ message: "Purchase added successfully" });
        } catch (error) {
            console.error("Error adding Purchase:", error);
            res.status(500).json({ error: error.message });
        }
}

async function DeletePurchase(req, res) {
    try {
        const { id } = req.params;
        await dbQueries.deletePurchase(id);
        res.status(200).json({ message: "Purchase deleted successfully" });
    } catch (error) {
        console.error("Error deleting purchase:", error);
        res.status(500).json({ error: error.message });
    }
}

async function GetSpecificPurchaseData(req, res){
    try{    
        const { id } = req.params;
        const purchaseData = await dbQueries.GetSpecificPurchaseData(id);
        res.status(200).json(purchaseData);
    } catch (error) {
        console.error(`Error getting Purchase data for ${req.params.id}`, error);
        res.status(404).json({error: error.message});
    }
}

export default {
    ListPurchases,
    AddNewPurchase,
    DeletePurchase,
    TestReturnFunction,
    GetSpecificPurchaseData,
};