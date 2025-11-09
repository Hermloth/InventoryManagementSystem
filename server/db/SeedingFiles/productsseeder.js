import pool from "../pool.js";

// ===== CONFIGURATION =====
const NUMBER_OF_RECORDS = 20;
// =========================

async function seedProducts() {
    try {
        console.log(`Starting to seed ${NUMBER_OF_RECORDS} product records...`);
        
        for (let i = 0; i < NUMBER_OF_RECORDS; i++) {
            const wix_id = null;
            const product_name = "Seed" + i
            const size = 300
            const style = "classic";
            const color = "white";
            const material_cost = Math.floor(Math.random() * 20) + 1; // 1-20;;
            const retail_price = 99;
            const SOH = Math.floor(Math.random() * 20) + 1; // 1-20;
            const SIT = 0;
            const reorder_level = 10;
            const reorder_link = "https://www.test.com";
            const reorder_link_two = "https://www.test2.com";
            
            await pool.query(
                `INSERT INTO products ( wix_id, product_name, size, style, color, material_cost, retail_price, SOH, SIT, reorder_level, reorder_link, reorder_link_two) 
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
                [wix_id, product_name, size, style, color, material_cost, retail_price, SOH, SIT, reorder_level, reorder_link, reorder_link_two]
            );
        }
        
        console.log(`Successfully seeded ${NUMBER_OF_RECORDS} product records!`);
        process.exit(0);
    } catch (error) {
        console.error("Error seeding products:", error);
        process.exit(1);
    }
}

seedProducts();
