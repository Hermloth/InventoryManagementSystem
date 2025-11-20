import { body, validationResult } from "express-validator";
import usersdbQueries from "../db/usersqueries.js"
import bcrypt from "bcryptjs";

function TestReturnFunction (req, res) {
    res.send("Test Return")
}

async function ListUsers (req, res) {
    try {
        const users = await usersdbQueries.getAllUsers();
        if (!users || users.length === 0){
            return res.status(404).json({error: "No users found"})
        }
        res.json(users)
    } catch (error) {
        console.error("unable to retrieve users", error)
        res.status(500).json({error: "Failed to retrieve users"})
    }

}

async function DeleteUser (req, res) {
    try {
        const { username } = req.params;

        const userToDelete = await usersdbQueries.getUserByUsername(username);

        
        // Prevent deleting the currently logged-in user
        if (req.user.username === username) {
            return res.status(400).json({ error: "Cannot delete your own account" });
        }

        const deletedUser = await usersdbQueries.deleteUserByUsername(username);
        
        if (!deletedUser) {
            return res.status(404).json({ error: "User not found" });
        }
        if (userToDelete.id === 1) {
            return res.status(403).json({ error: "Cannot delete the master admin account" });
        }

        res.json({ 
            success: true, 
            message: `User ${username} deleted successfully`,
            deletedUser 
        });
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ error: "Failed to delete user" });
    }
}


async function CreateUser (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { username, password } = req.body;
        
        // Check if user already exists
        const existingUser = await usersdbQueries.getUserByUsername(username);
        if (existingUser) {
            return res.status(400).json({ error: "Username already exists" });
        }

        // Hash the password
        const passwordHash = await bcrypt.hash(password, 10);

        // Create the user
        const newUser = await usersdbQueries.createUser(username, passwordHash);

        res.status(201).json({ 
            success: true, 
            message: "User created successfully",
            user: newUser 
        });
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ error: "Failed to create user" });
    }
}



export default {
    TestReturnFunction,
    ListUsers,
    DeleteUser,
    CreateUser,
};