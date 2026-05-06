/* Transaction Manager class */

// filereader, to be replaced with database conn in the future
const fs = require('fs');
// TODO: Will call database functions instead of filereader functions (db funct locateed in models/database/transaction-db.js aka ../database/transaction-db.js)

class TransactionManager {
  constructor(jsonFilePath) {
    // this.connection = connection;
    this.jsonFilePath = jsonFilePath;
  }

  // Get all transactions from the json file
  fetchAll(callback) {
    const allTransactions = JSON.parse(fs.readFileSync(this.jsonFilePath, 'utf-8'));
    callback(allTransactions);
  }

  fetchById(id, callback) { // TODO: Add validation to ensure id exists and is a number
    this.fetchAll(allTransactions => {
      const transaction = allTransactions.find(t => t.id === parseInt(id));
      callback(transaction);
    });
  }

  // Create a new transaction and save it to the json file.
  create(newTransactionData, callback) {
    this.fetchAll(allTransactions => {
      // Find the largest existing id (number), ignoring any undefined/null/NaN ids
      let maxId = 0;
      allTransactions.forEach(t => {
        if (typeof t.id === 'number' && !isNaN(t.id) && t.id > maxId) {
          maxId = t.id;
        }
      });
      const newId = maxId + 1;
      const newTransaction = { id: newId, ...newTransactionData };
      allTransactions.push(newTransaction);
      fs.writeFileSync(this.jsonFilePath, JSON.stringify(allTransactions, null, 2), 'utf-8');
      callback(newTransaction);
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


  /* Overwrites all transactions with the updated transaction data. In the future, this will update a single transaction in the database instead of overwriting all transactions in a json file. */
  deleteById(id, callback) {
    this.fetchAll(allTransactions => {
      const updatedTransactions = allTransactions.filter(t => t.id !== parseInt(id)); // get all transactions except the one with the specified id
      fs.writeFileSync(this.jsonFilePath, JSON.stringify(updatedTransactions, null, 2), 'utf-8'); // overwrite the json file with the updated transactions array
      callback({ message: `Transaction with id ${id} deleted successfully.` }); // return message
    });
  }
}

module.exports = TransactionManager;