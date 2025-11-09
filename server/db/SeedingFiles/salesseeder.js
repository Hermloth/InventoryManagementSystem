import pool from "../pool.js";

// ===== CONFIGURATION =====
const NUMBER_OF_RECORDS = 20;
// =========================

async function seedSales() {
    try {
        console.log(`Starting to seed ${NUMBER_OF_RECORDS} sale records...`);
        
        for (let i = 0; i < NUMBER_OF_RECORDS; i++) {


            const product_id = Math.floor(Math.random() * 20) + 1; // 1-20
            const sale_channel = ['Online', 'Instore', 'Consignment'][Math.floor(Math.random() * 3)];            
            const sale_amount = Math.floor(Math.random() * 100) + 1; // 1-100
            
            await pool.query(
                `INSERT INTO sales (product_id, sale_channel, sale_amount) 
                VALUES ($1, $2, $3)`,
                [product_id, sale_channel, sale_amount]
            );           
        }
        
        console.log(`Successfully seeded ${NUMBER_OF_RECORDS} sale records!`);
        process.exit(0);
    } catch (error) {
        console.error("Error seeding sales:", error);
        process.exit(1);
    }
}

seedSales();
