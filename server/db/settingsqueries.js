import pool from "./pool.js";



// GET all settings in DB
async function getAllSettings() {
    const {rows} = await pool.query("SELECT * FROM settings;");
    return rows;
}

const settingsdbQuery = {
    getAllSettings,
}

export default settingsdbQuery