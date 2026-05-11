
/* Transaction SQL CRUD functions */

const mysql = require('mysql2/promise');
const pool = require('../config/dbconfig');

// Get all transactions from the database
async function getAllTransactions() {
    try {
        const [rows] = await pool.query('SELECT * FROM Transaction');
        return rows;
    } catch (err) {
        // Let the controller handle the error
        throw err;
    }
}

async function getTransactionById(id) {
    try {
        const [rows] = await pool.query('SELECT * FROM Transaction WHERE id = ?', [id]);
        if (rows.length === 0) {
            return null; // Not found
        }
        return rows[0];
    } catch (err) {
        // Let the controller handle the error
        throw err;
    }
}

async function deleteTransactionById(id) {
    try {
        const [result] = await pool.query('DELETE FROM Transaction WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            return { success: false, message: 'Transaction not found' };
        }
        return { success: true, message: 'Transaction deleted successfully' };
    } catch (err) {
        throw err;
    }
}

module.exports = {
    getAllTransactions,
    getTransactionById,
    deleteTransactionById
};

// add transaction to database
// module.exports.addTransaction = async  function  addTransaction(order) {
//   try {
//     let  pool = await  sql.connect(dbConfig);
//     let  insertTransaction = await  pool.request()
//     .input('Title', sql.NVarChar, order.Title)
//     .input('Quantity', sql.Int, order.Quantity)
//     .input('Message', sql.NVarChar, order.Message)
//     .input('City', sql.NVarChar, order.City)
//     .execute('InsertTransaction'); // Assuming you have a stored procedure named 'InsertTransaction' that takes these parameters
//     return  insertTransaction.recordsets;
//   }
//   catch (err) {
//     console.log(err);
//   }
// }