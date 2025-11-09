import { Client } from "pg"
import dotenv from "dotenv";
dotenv.config();

const SQLSettingsTableGeneration =
    `CREATE TABLE IF NOT EXISTS settings (
        stripe_fees NUMERIC (10,2),
        business_registration_calc NUMERIC (10,2),
        website_fee_calc NUMERIC (10,2),
        packaging_cost NUMERIC (10,2),
        labour_cost NUMERIC (10,2),
        admin_costs NUMERIC (10,2),
        domain_fees NUMERIC (10,2),
        target_margin NUMERIC (10,2),
        wix_integration_enabled BOOLEAN DEFAULT false
        );`

const SQLSettingsTableSeeding = 
    `INSERT INTO settings VALUES (
        0.3,
        1.0,
        1.5,
        2.0,
        2.5,
        3.0,
        3.5,
        0.7
    );
    `

async function main() {
    const password = encodeURIComponent(process.env.DBPASSWORD);
    const client = new Client ({
        connectionString: `postgresql://${process.env.DBUSER}:${password}@${process.env.DBHOST}:${process.env.DBPORT}/${process.env.DATABASE}`,
    });
    console.log('Connecting to DB')
    await client.connect();
    console.log("DB OPERATION - CREATING SETTINGS TABLE")
    await client.query(SQLSettingsTableGeneration);
    console.log("DB OPERATION - SEEDING SETTINGS TABLE")
    await client.query(SQLSettingsTableSeeding);
    await client.end();
    console.log("DB OPERATION COMPLETE");
}

main();