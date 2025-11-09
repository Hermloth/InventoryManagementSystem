import { Client } from "pg";
import dotenv from "dotenv";
dotenv.config();

// Create Tables
const createProductsTable = `
    CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        wix_id VARCHAR(255),
        product_name VARCHAR(255),
        size VARCHAR(255),
        style VARCHAR(255),
        color VARCHAR(255),
        material_cost NUMERIC(10,2),
        retail_price NUMERIC(10,2),
        SOH INTEGER,
        SIT INTEGER,
        reorder_level INTEGER,
        reorder_link VARCHAR(255),
        reorder_link_two VARCHAR(255)
    );
`;

const createSettingsTable = `
    CREATE TABLE IF NOT EXISTS settings (
        stripe_fees NUMERIC(10,2),
        business_registration_calc NUMERIC(10,2),
        website_fee_calc NUMERIC(10,2),
        packaging_cost NUMERIC(10,2),
        labour_cost NUMERIC(10,2),
        admin_costs NUMERIC(10,2),
        domain_fees NUMERIC(10,2),
        target_margin NUMERIC(10,2),
        wix_integration_enabled BOOLEAN DEFAULT false
    );
`;

const createSalesTable = `
    CREATE TABLE IF NOT EXISTS sales (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
        sale_amount NUMERIC(10,2),
        sale_channel VARCHAR (255),
        sale_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
`;

const createPurchasesTable = `
    CREATE TABLE IF NOT EXISTS purchases (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
        purchase_amount NUMERIC(10,2),
        unit_amount NUMERIC(10,2),
        purchase_qty INTEGER,
        purchase_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
`;

async function setupDatabase() {
    const password = encodeURIComponent(process.env.DBPASSWORD);
    const client = new Client({
        connectionString: `postgresql://${process.env.DBUSER}:${password}@${process.env.DBHOST}:${process.env.DBPORT}/${process.env.DATABASE}`,
    });

    try {
        console.log('Connecting to database...');
        await client.connect();
        console.log('Connected successfully!\n');
        
        // Create Tables
        console.log('📦 CREATING TABLES...');
        console.log('  → Creating products table...');
        await client.query(createProductsTable);
        
        console.log('  → Creating settings table...');
        await client.query(createSettingsTable);
        
        console.log('  → Creating sales table...');
        await client.query(createSalesTable);
        
        console.log('  → Creating purchases table...');
        await client.query(createPurchasesTable);
        console.log('✅ All tables created successfully!\n');

    } catch (error) {
        console.error('❌ Error setting up database:', error.message);
        throw error;
    } finally {
        await client.end();
        console.log('Database connection closed.');
    }
}

// Run the setup and seed
setupDatabase()
    .then(() => {
        console.log('\n✨ Database setup and seeding complete!');
        process.exit(0);
    })
    .catch((error) => {
        console.error('\n💥 Database setup failed:', error);
        process.exit(1);
    });