import { Client } from "pg"
import dotenv from "dotenv";
dotenv.config();

const SQLProductTableGeneration =
    `CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        wix_id VARCHAR (255),
        product_name VARCHAR (255),
        size VARCHAR (255),
        style VARCHAR (255),
        color VARCHAR (255),
        material_cost NUMERIC (10,2),
        retail_price NUMERIC (10,2),
        SOH INTEGER,
        SIT INTEGER,
        reorder_level INTEGER,
        reorder_link VARCHAR(255),
        reorder_link_two VARCHAR(255)
        );`

async function main() {
    const password = encodeURIComponent(process.env.DBPASSWORD);
    const client = new Client ({
        connectionString: `postgresql://${process.env.DBUSER}:${password}@${process.env.DBHOST}:${process.env.DBPORT}/${process.env.DATABASE}`,
    });
    console.log('Connecting to DB')
    await client.connect();
    console.log("DB OPERATION - CREATING PRODUCTS TABLE")
    await client.query(SQLProductTableGeneration);
    await client.end();
    console.log("DB OPERATION COMPLETE");
}

main();