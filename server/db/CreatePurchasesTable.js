import { Client } from "pg"
import dotenv from "dotenv";
dotenv.config();

const SQLPurchasesTableGeneration =
    `CREATE TABLE IF NOT EXISTS purchases (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        product_id INTEGER NOT NULL,
        purchase_amount NUMERIC (10,2),
        unit_amount NUMERIC (10,2),
        purchase_qty NUMERIC (4,0),
        FOREIGN KEY (product_id) REFERENCES products(id)
        );`

const SQLPurchaseTableSeed =
    `INSERT INTO purchases (
        product_id,
        purchase_amount,
        unit_amount,
        purchase_qty)
        VALUES (1, 5.00, 1.25, 3);`

async function main() {
    const password = encodeURIComponent(process.env.DBPASSWORD);
    const client = new Client ({
        connectionString: `postgresql://${process.env.DBUSER}:${password}@${process.env.DBHOST}:${process.env.DBPORT}/${process.env.DATABASE}`,
    });

    console.log('Connecting to DB')
    await client.connect();
    console.log("DB OPERATION - CREATING PURCHASES TABLE")
    await client.query(SQLPurchasesTableGeneration);
    await client.query(SQLPurchaseTableSeed);
    await client.end();
    console.log("DB OPERATION COMPLETE");
}

main();