import { Client } from "pg";
import dotenv from "dotenv";
dotenv.config();

const SQLUserTableCreation = `
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    passwordhash VARCHAR(255) NOT NULL
);`

async function main(){
    const password = encodeURIComponent(process.env.DBPASSWORD);
    const client = new Client ({
    connectionString: `postgresql://${process.env.DBUSER}:${password}@${process.env.DBHOST}:${process.env.DBPORT}/${process.env.DATABASE}`,
    });

    console.log('Connecting to DB')
    await client.connect();
    console.log("DB OPERATION - CREATING USERS TABLE")
    await client.query(SQLUserTableCreation);
    await client.end();
    console.log("DB OPERATION COMPLETE");
}

main();