/* Transaction Manager class */

// filereader, to be replaced with database conn in the future
// const fs = require('fs');
const transactionDb = require('../../database/transaction-db'); // Import the transaction database module for database operations


class TransactionManager {
  constructor() { /* No connection needed; uses transactionDb directly */ }

  // Get all transactions from the database
  fetchAll(callback) {
    transactionDb.getAllTransactions()
      .then(allTransactions =>
        callback(null, allTransactions.map(t => ({
          id: t.id,
          name: t.name,
          amount: t.amount,
          type: t.type,
          date: t.date.toISOString().slice(0, 10), // Convert date to 'YYYY-MM-DD' format
          accountId: t.account_id,  // rename to have consistent camelCase field names outside the database layer
          category: t.category,
          method: t.method
        })))
      )
      .catch(err => {
        console.error('Error fetching transactions: ', err);
        callback(err, null);
      });
  }

  fetchById(id, callback) { // TODO: Add validation to ensure id exists and is a number
    transactionDb.getTransactionById(id)
      .then(transaction => {
        if (transaction) { // if the transaction with the specified id is found, format it and return it
          const formattedTransaction = {
            id: transaction.id,
            name: transaction.name,
            amount: transaction.amount,
            type: transaction.type,
            date: transaction.date.toISOString().slice(0, 10), // Convert date to 'YYYY-MM-DD' format
            accountId: transaction.account_id,  // rename to have consistent camelCase field names outside the database layer
            category: transaction.category,
            method: transaction.method
          };
          callback(null, formattedTransaction); // no error, found
        } else {
          callback(null, null); // no error, not found
        }
      })
      .catch(err => {
        console.error('Error fetching transaction by id: ', err);
        callback(err, null); // error occurred
      });
  }

  // Create a new transaction in the database
  create(newTransactionData, callback) {
    transactionDb.createTransaction(newTransactionData)
      .then(newTransaction => {
        callback(null, newTransaction);
      })
      .catch(err => {
        console.error('Error creating transaction:', err);
        callback(err, null);
      });
  }

  // Update a transaction by id using the database
  updateById(id, updatedData, callback) {
    transactionDb.updateTransactionById(id, updatedData)
      .then(result => {
        if (!result.success) {
          // Not found
          return callback(null, null);
        }
        // Optionally, fetch the updated transaction to return the new data
        this.fetchById(id, (err, updatedTransaction) => {
          if (err) {
            return callback(err, null);
          }
          callback(null, updatedTransaction);
        });
      })
      .catch(err => {
        console.error('Error updating transaction:', err);
        callback(err, null);
      });
  }


  // Delete a transaction by id using the database
  deleteById(id, callback) {
    transactionDb.deleteTransactionById(id)
      .then(result => {
        if (!result.success) {
          // Not found
          return callback(null, null);
        }
        callback(null, { message: result.message });
      })
      .catch(err => {
        console.error('Error deleting transaction:', err);
        callback(err, null);
      });
  }
}

module.exports = TransactionManager;