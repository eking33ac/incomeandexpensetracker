/* Account SQL CRUD functions */

const mysql = require('mysql2/promise');
const dbconfig = require('../config/dbconfig');
const pool = dbconfig.pool;

// Get all accounts from the database
async function getAllAccounts() {
    let connection;
    try {
        const [rows] = await pool.query('SELECT * FROM Account');
        return rows;
    } catch (err) {
        // console.error('Error fetching accounts: ', err);
        throw err;
        // throw err;
    }
}

module.exports = {
    getAllAccounts
};