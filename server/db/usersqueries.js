import pool from "./pool.js";



// GET all users in DB
async function getAllUsers() {
try {
        const { rows } = await pool.query(
            "SELECT id, username FROM users ORDER BY id"
        );
        return rows;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
};

async function getUserByUsername(username) {
    try {
        const { rows } = await pool.query(
            "SELECT id, username FROM users WHERE username = $1",
            [username]
        );
        return rows[0]; // Returns the user or undefined if not found
    } catch (error) {
        console.error("Error fetching user:", error);
        throw error;
    }
}


async function deleteUserByUsername(username) {
    try {
        const { rows } = await pool.query(
            "DELETE FROM users WHERE username = $1 RETURNING id, username",
            [username]
        );
        return rows[0]; // Returns the deleted user or undefined if not found
    } catch (error) {
        console.error("Error deleting user:", error);
        throw error;
    }
}

async function createUser(username, passwordHash) {
    try {
        const { rows } = await pool.query(
            "INSERT INTO users (username, passwordhash) VALUES ($1, $2) RETURNING id, username",
            [username, passwordHash]
        );
        return rows[0];
    } catch (error) {
        console.error("Error creating user:", error);
        throw error;
    }
}


const usersdbQuery = {
    getAllUsers,
    deleteUserByUsername,
    createUser,
    getUserByUsername,
}

export default usersdbQuery