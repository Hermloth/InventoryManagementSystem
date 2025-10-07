import { Client } from "pg"
import dotenv from "dotenv";
dotenv.config();

const SQLSalesTableGeneration =
    `CREATE TABLE IF NOT EXISTS sales (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        product_id INTEGER NOT NULL,
        sale_amount NUMERIC (10,2),
        FOREIGN KEY (product_id) REFERENCES products(id)
        );`

const SQLSalesTableSeed =
    `INSERT INTO sales (
        product_id,
        sale_amount)
        VALUES (1, 10.00);`

async function main() {
    const password = encodeURIComponent(process.env.DBPASSWORD);
    const client = new Client ({
        connectionString: `postgresql://${process.env.DBUSER}:${password}@${process.env.DBHOST}:${process.env.DBPORT}/${process.env.DATABASE}`,
    });
    console.log('Connecting to DB')
    await client.connect();
    console.log("DB OPERATION - CREATING SALES TABLE")
    await client.query(SQLSalesTableGeneration);
    await client.query(SQLSalesTableSeed);
    await client.end();
    console.log("DB OPERATION COMPLETE");
}

main();