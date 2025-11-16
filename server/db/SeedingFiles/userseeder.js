import pool from "../pool.js";
import bcrypt from "bcryptjs";

// ===== CONFIGURATION =====
import dotenv from "dotenv";
dotenv.config();


// =========================

async function seedUsers() {
    try {
        console.log(`Starting to seed base User records...`);
        const BaseUserImport = JSON.parse(process.env.BASE_USERS)
        
        for (const u of BaseUserImport) {

            const hashedPassword = await bcrypt.hash(u.password, 10);

            await pool.query(
                `INSERT INTO users (username, passwordhash) 
                VALUES ($1, $2)`,
                [u.username, hashedPassword]
            );           
        }
        
        console.log(`Successfully seeded base users!`);
        process.exit(0);
    } catch (error) {
        console.error("Error seeding users:", error);
        process.exit(1);
    }
}

seedUsers();