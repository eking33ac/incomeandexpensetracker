/* Account Manager class */

// filereader, to be replaced with database conn in the future
const fs = require('fs');
// TODO: Will call database functions instead of filereader functions (db funct locateed in models/database/transaction-db.js aka ../database/transaction-db.js)

class AccountManager {
  constructor(jsonFilePath) {
    // this.connection = connection;
    this.jsonFilePath = jsonFilePath;
  }

  // Get all accounts from the json file
  fetchAll(callback) {
    const allAccounts = JSON.parse(fs.readFileSync(this.jsonFilePath, 'utf-8'));
    callback(allAccounts);
  }

  fetchById(id, callback) { // TODO: Add validation to ensure id exists and is a number
    this.fetchAll(allAccounts => {
      const account = allAccounts.find(a => a.id === parseInt(id));
      callback(account);
    });
  }
}

module.exports = AccountManager;