/* Payment Method Manager class */

// filereader, to be replaced with database conn in the future
const fs = require('fs');
// TODO: Will call database functions instead of filereader functions (db funct locateed in models/database/transaction-db.js aka ../database/transaction-db.js)

class MethodManager {
  constructor(jsonFilePath) {
    // this.connection = connection;
    this.jsonFilePath = jsonFilePath;
  }

  // Get all payment methods from the json file
  fetchAll(callback) {
    const allMethods = JSON.parse(fs.readFileSync(this.jsonFilePath, 'utf-8'));
    callback(allMethods);
  }
}

module.exports = MethodManager;