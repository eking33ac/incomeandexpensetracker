const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
const dbConfig = require('../config/dbconfig');

async function setupDatabase() {
    // Initial connection without database selected (to create the DB)
    const connection = await mysql.createConnection({
        host: dbConfig.DB_HOST,
        user: dbConfig.DB_USER,
        password: dbConfig.DB_PASSWORD,
        // port: dbConfig.DB_PORT || 3306,
        multipleStatements: true // Allow executing multiple statements in one query
    });

    try {
        console.log('---Starting database setup---');

        console.log(`Running migration`)
        // 1. Run Migration
        const migrationFilePath = path.join(__dirname, '..', 'migration.sql'); // get migration file
        const migrationSql = fs.readFileSync(migrationFilePath, 'utf-8'); // read migration file
        await connection.query(migrationSql); // execute migration file
        console.log(`Database migrated successfully: Tables created successfully from ${migrationFilePath}`);

        console.log(`Running seed`)
        // 2. Run Seed
        const seedFilePath = path.join(__dirname, '..', 'seed.sql'); // get seed file
        const seedSql = fs.readFileSync(seedFilePath, 'utf-8'); // read seed file
        await connection.query(seedSql); // execute seed file
        console.log(`Database seeded successfully: Test data inserted from ${seedFilePath}`);
    } catch (err) { // Catch any error that occurs during migration or seeding
        console.error('Error during database setup:', err);
    } finally { // Ensure the connection is closed after setup
        await connection.end(); // close the connection
        console.log('Database setup completed.');
        process.exit(0); // Exit the process after setup is complete
    }
}

// call setup
setupDatabase();