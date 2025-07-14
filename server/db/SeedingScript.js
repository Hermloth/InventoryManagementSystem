import { Client } from "pg"
import dotenv from "dotenv";
dotenv.config();

const SQLProductTableGeneration =
    `CREATE TABLE IF NOT EXISTS products (id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        productdescription VARCHAR (255),
        producttitle VARCHAR (255),
        category VARCHAR (255),
        priceexgst NUMERIC(10,2),
        color VARCHAR (255),
        length VARCHAR (255),
        style VARCHAR (255),
        reorderlevel INTEGER,
        reorderlink VARCHAR (255),
        reorderlinktwo VARCHAR(255),
        qtyonhand INTEGER,
        qtyintransit INTEGER
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