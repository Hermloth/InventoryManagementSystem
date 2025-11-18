import pool from "./pool.js";



// GET all users in DB
async function getAllUsers() {
    const {rows} = await pool.query("SELECT * FROM users;");
    return rows;
}



const usersdbQuery = {
    getAllUsers,
}

export default usersdbQuery