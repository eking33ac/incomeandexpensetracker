/* Account Manager class */


const accountDb = require('../../database/account-db');

class AccountManager {
  constructor() {
    // No connection or file path needed; uses accountDb directly
  }

  // Get all accounts from the database
  fetchAll(callback) {
    accountDb.getAllAccounts()
      .then(allAccounts => 
        {console.log("Fetched all accounts in manager");
        callback(allAccounts); })
      .catch(err => console.error('Error fetching accounts: ', err));
  }

  fetchById(id, callback) { // TODO: Add validation to ensure id exists and is a number
    this.fetchAll(allAccounts => {
      const account = allAccounts.find(a => a.id === parseInt(id));
      callback(account);
    });
  }
}

module.exports = AccountManager;