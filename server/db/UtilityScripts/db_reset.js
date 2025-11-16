import { Client } from "pg";
import dotenv from "dotenv";
dotenv.config();

const dropTablesSQL = `
    DROP TABLE IF EXISTS sales CASCADE;
    DROP TABLE IF EXISTS purchases CASCADE;
    DROP TABLE IF EXISTS products CASCADE;
    DROP TABLE IF EXISTS settings CASCADE;
    DROP TABLE IF EXISTS users CASCADE;
`;

async function resetDatabase() {
    const password = encodeURIComponent(process.env.DBPASSWORD);
    const client = new Client({
        connectionString: `postgresql://${process.env.DBUSER}:${password}@${process.env.DBHOST}:${process.env.DBPORT}/${process.env.DATABASE}`,
    });

    try {
        console.log('Connecting to database...');
        await client.connect();
        console.log('Connected successfully!');
        
        console.log('\n🗑️  DROPPING ALL TABLES...');
        await client.query(dropTablesSQL);
        console.log('✅ All tables dropped successfully!\n');
        
    } catch (error) {
        console.error('❌ Error resetting database:', error.message);
        throw error;
    } finally {
        await client.end();
        console.log('Database connection closed.');
    }
}

// Run the reset
resetDatabase()
    .then(() => {
        console.log('\n✨ Database reset complete!');
        process.exit(0);
    })
    .catch((error) => {
        console.error('\n💥 Database reset failed:', error);
        process.exit(1);
    });