/* Transaction Type Manager class */

// filereader, to be replaced with database conn in the future
const fs = require('fs');
// TODO: Will call database functions instead of filereader functions (db funct locateed in models/database/transaction-db.js aka ../database/transaction-db.js)

class TransactionTypeManager {
  constructor(jsonFilePath) {
    // this.connection = connection;
    this.jsonFilePath = jsonFilePath;
  }

  // Get all transaction types from the json file
  fetchAll(callback) {
    const allTransactionTypes = JSON.parse(fs.readFileSync(this.jsonFilePath, 'utf-8'));
    callback(allTransactionTypes);
  }
}

module.exports = TransactionTypeManager;