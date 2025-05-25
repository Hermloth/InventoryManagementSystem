import { Client } from "pg"
import dotenv from "dotenv";
dotenv.config();

const SQLProductTableGeneration =
    `CREATE TABLE IF NOT EXISTS products (id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        productdescription VARCHAR (255),
        producttitle VARCHAR (255),
        category VARCHAR (255),
        priceexgst INTEGER,
        color VARCHAR (255),
        length VARCHAR (255)
        );`

        async function main() {
            console.log("DB OPERATION - CREATING PRODUCTS TABLE")
            const password = encodeURIComponent(process.env.DBPASSWORD);
            const client = new Client ({
                connectionString: `postgresql://${process.env.DBUSER}:${password}@${process.env.DBHOST}:${process.env.DBPORT}/${process.env.DATABASE}`,
            });
            await client.connect();
            await client.query(SQLProductTableGeneration);
            await client.end();
            console.log("DB OPERATION COMPLETE");
        }

main();