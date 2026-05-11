/* Account SQL CRUD functions */

const mysql = require('mysql2/promise');
const pool = require('../config/dbconfig');

// Get all accounts from the database
async function getAllAccounts() {
    let connection;
    try {
        const [rows] = await pool.query('SELECT * FROM Account');
        return rows;
    } catch (err) {
        console.error('Error fetching accounts: ', err);
        return res.status(500).json({ error: 'Internal server error: Failed to fetch transactions' });
        // throw err;
    }
}

module.exports = {
    getAllAccounts
};