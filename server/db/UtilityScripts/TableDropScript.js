import { Client } from "pg"
import dotenv from "dotenv";
dotenv.config();

const SQLSalesTableDrop = 
    `DROP TABLE IF EXISTS sales;`

const SQLPurchasesTableDrop = 
    `DROP TABLE IF EXISTS purchases;`

const SQLProductTableDrop =
    `DROP TABLE IF EXISTS products;`

const SQLSettingsTableDrop = 
    `DROP TABLE IF EXISTS settings;`



async function main() {
    
    const password = encodeURIComponent(process.env.DBPASSWORD);
    const client = new Client ({
        connectionString: `postgresql://${process.env.DBUSER}:${password}@${process.env.DBHOST}:${process.env.DBPORT}/${process.env.DATABASE}`,
    });
    console.log('Connecting to DB')
    await client.connect();

    console.log("DB OPERATION - DROPPING TABLE 'sales'")
    await client.query(SQLSalesTableDrop);
    console.log("DB OPERATION - DROPPING TABLE 'purchases'")
    await client.query(SQLPurchasesTableDrop);

    console.log("DB OPERATION - DROPPING TABLE 'products'")
    await client.query(SQLProductTableDrop);
    console.log("DB OPERATION - DROPPING TABLE 'settings'")
    await client.query(SQLSettingsTableDrop);

    await client.end();
    console.log("DB OPERATION COMPLETE");
}

main();
