import pool from "../pool.js";

// ===== CONFIGURATION =====
// N/A
// =========================

async function seedSettings() {
    try {
        console.log(`Starting to seed settings...`);
            
            await pool.query(
                `INSERT INTO settings (stripe_fees, business_registration_calc, website_fee_calc, packaging_cost, labour_cost, admin_costs, domain_fees, target_margin, wix_integration_enabled) 
                VALUES (0.35, 1.66, 2.66, 3.66, 4.66, 5.66, 85, 6.66, false)`,
            );

        console.log(`Successfully seeded settings!`);
        process.exit(0);
    } catch (error) {
        console.error("Error seeding settings:", error);
        process.exit(1);
    }
}

seedSettings();    