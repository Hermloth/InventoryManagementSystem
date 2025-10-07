import { body, validationResult } from "express-validator";
import dbQueries from "../db/settingsqueries.js"

function TestReturnFunction (req, res) {
    res.send("Test Return")
}

async function ListSettings (req, res) {
    const settings = await dbQueries.getAllSettings();
    res.json(settings);
}

export default {
    ListSettings,
    TestReturnFunction,
};