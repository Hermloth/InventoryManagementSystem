import pool from "../pool.js";

// ===== CONFIGURATION =====
const NUMBER_OF_RECORDS = 20;
// =========================

async function seedPurchases() {
    try {
        console.log(`Starting to seed ${NUMBER_OF_RECORDS} purchase records...`);
        
        for (let i = 0; i < NUMBER_OF_RECORDS; i++) {
            const productId = 1;
            const purchaseAmount = Math.floor(Math.random() * 300) + 1; // 1-300
            const purchaseQty = Math.floor(Math.random() * 50) + 1; // 1-50
            const unitAmount = purchaseAmount / purchaseQty;
            
            await pool.query(
                `INSERT INTO purchases (product_id, purchase_amount, unit_amount, purchase_qty) 
                VALUES ($1, $2, $3, $4)`,
                [productId, purchaseAmount, unitAmount, purchaseQty]
            );
            
            console.log(`Inserted record ${i + 1}: Amount: $${purchaseAmount}, Qty: ${purchaseQty}, Unit: $${unitAmount.toFixed(2)}`);
        }
        
        console.log(`Successfully seeded ${NUMBER_OF_RECORDS} purchase records!`);
        process.exit(0);
    } catch (error) {
        console.error("Error seeding purchases:", error);
        process.exit(1);
    }
}

seedPurchases();