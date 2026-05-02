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
    // For now, return dummy data. Eventually, read from json file and return data.
    // const dummyTransactions = [
    //   { id: 1, amount: 100, date: '2024-01-01', description: 'Grocery shopping' },
    //   { id: 2, amount: 50, date: '2024-01-02', description: 'Gas' },
    //   { id: 3, amount: 200, date: '2024-01-03', description: 'Rent' }
    // ];
    // callback(dummyTransactions);

    const transactions = fs.readFileSync(this.jsonFilePath, 'utf-8');
    callback(transactions);
  }
}

module.exports = TransactionManager;