
/* Transaction SQL CRUD functions */

const mysql = require('mysql2/promise');
const dbConfig = require('../config/dbconfig');

// Get all transactions from the database
async function getAllTransactions() {
    let connection;
    try {
        connection = await mysql.createConnection(dbConfig);
        const [rows] = await connection.execute('SELECT * FROM Transaction');
        return rows;
    } catch (err) {
        console.error('Error fetching transactions: ', err);
        throw err;
    } finally {
        if (connection) await connection.end();
    }
}

module.exports = {
    getAllTransactions
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