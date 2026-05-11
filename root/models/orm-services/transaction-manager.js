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

  // Update a transaction by id. In the future, this will update a single transaction in the database instead of overwriting all transactions in a json file.
  updateById(id, updatedData, callback) {
    this.fetchAll(allTransactions => {
      const updatedTransactions = allTransactions.map(t => {
        if (t.id === parseInt(id)) {
          return { ...t, ...updatedData }; // merge the existing transaction data with the updated data, giving precedence to the updated data in case of overlapping fields (TODO: Vscode suggested this and the comment, so check if that is ACTUALLY the case)
        }
        return t;
      });
      fs.writeFileSync(this.jsonFilePath, JSON.stringify(updatedTransactions, null, 2), 'utf-8'); // overwrite the json file with the updated transactions array
      const updatedTransaction = updatedTransactions.find(t => t.id === parseInt(id));
      callback(updatedTransaction);
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