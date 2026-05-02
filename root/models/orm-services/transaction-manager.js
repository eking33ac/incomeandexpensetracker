/* Transaction Manager class */

// filereader, to be replaced with database conn in the future
const fs = require('fs');

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

  fetchById(id, callback) {
    this.fetchAll(allTransactions => {
      const transaction = allTransactions.find(t => t.id === parseInt(id));
      callback(transaction);
    });
  }
}

module.exports = TransactionManager;