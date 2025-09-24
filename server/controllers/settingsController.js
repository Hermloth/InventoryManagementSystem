import { body, validationResult } from "express-validator";
import settingsdbQuery from "../db/settingsqueries.js"
//import myWixClient from "../utils/wixClient.js";

function TestReturnFunction (req, res) {
    res.send("Test Return")
}

export default {
    TestReturnFunction,
};