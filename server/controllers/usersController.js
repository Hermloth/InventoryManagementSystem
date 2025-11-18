import { body, validationResult } from "express-validator";
import usersdbQueries from "../db/usersqueries.js"

function TestReturnFunction (req, res) {
    res.send("Test Return")
}

async function ListUsers (req, res) {
    try {
        const users = await usersdbQueries.getAllUsers();
        if (!users || users.length === 0){
            return res.status(404).json({error: "No users found"})
        }
        res.json(users[0])
    } catch (error) {
        console.error("unable to retreive users", error)
    }

}

export default {
    TestReturnFunction,
    ListUsers,
};