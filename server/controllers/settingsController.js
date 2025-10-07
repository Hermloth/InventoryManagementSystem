import { body, validationResult } from "express-validator";
import dbQueries from "../db/settingsqueries.js"

function TestReturnFunction (req, res) {
    res.send("Test Return")
}

async function ListSettings (req, res) {
    try{    
        const settings = await dbQueries.getAllSettings();
        if (!settings || settings.length === 0) {
            return res.status(404).json({ error: "No settings found" });
        }
        res.json(settings[0]);
    } catch (error) {
        console.error("Unable to retreive settings", error)
    }
}

async function UpdateSettings(req, res){
    try{
        const updatedRow = await dbQueries.updateSettings(req.body);    
        if (!updatedRow) {
            return res.status(404).json({ error: "No settings row found to update" });
        }

        res.status(200).json({ message: "Settings updated successfully", data: updatedRow });
    
    } catch (error){
        console.error("Unable to update settings", error)
        res.status(500).json({error: error.message})
    }
}

export default {
    ListSettings,
    TestReturnFunction,
    UpdateSettings,
};