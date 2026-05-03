/* Category Manager class */

// filereader, to be replaced with database conn in the future
const fs = require('fs');
// TODO: Will call database functions instead of filereader functions (db funct locateed in models/database/transaction-db.js aka ../database/transaction-db.js)

class CategoryManager {
  constructor(jsonFilePath) {
    // this.connection = connection;
    this.jsonFilePath = jsonFilePath;
  }

  // Get all categories from the json file
  fetchAll(callback) {
    const allCategories = JSON.parse(fs.readFileSync(this.jsonFilePath, 'utf-8'));
    callback(allCategories);
  }
}

module.exports = CategoryManager;