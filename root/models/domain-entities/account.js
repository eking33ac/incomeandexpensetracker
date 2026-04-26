//// TODO/current task: Changing data.js into models like this one
//// This is just like the example product model in learning folder. No attention to if it is what we need for accounts yet.

/* Account class/entity */

const fs = require('fs');
const path = require('path');
const rootDir = require('../../util/path');

// helper constant path
const p = path.join(
    rootDir,
    'data',
    'account-data.json'
);

// helper function to read accounts from file
// Would not be in here or in account-manager, but for now, put it here for testing purposes. Should move to a data-fetching folder. Gotta figure out which folder that is. #TODO
const getAccountsFromFile = (cb) => { // cb is for callback
    fs.readFile(p, (err, fileContent) => { // Why use this and not fetch? Because fetch is for client side and this is server side. #TODO 
        if (err) {
            cb([]); // return [] via the callback
        } else {
            cb(JSON.parse(fileContent)); // return populated array via callback
        }
    });
};

module.exports = class Account {
    constructor(name, balance, color) {
        this.name = name;
        this.balance = balance;
        this.color = color;
    }

    // methods
    // put save into account-manager because that handles all database/file interactions, but for now, put it here for testing purposes. #TODO
    // save new account to file
    save() {
        getAccountsFromFile(accounts => {
            accounts.push(this);
            fs.writeFile(p, JSON.stringify(accounts), (err) => {
                console.log(err);
            });
        });
    }

    // put in account-manager because that handles all database/file interactions #TODO
    static fetchAll(cb) { // cb is for callback
        getAccountsFromFile(cb);
    }

    // prior balance object has the account id, prior balance, and prior balance date of creation/update
    // returns a new balance to be put into a BalanceUpdater/Manager object that will be used to update the balance of the account in the file
    calculateNewBalance(priorBalanceObject) {
        // Based on prior balance, date it was set, and transactions set since then (transactions found by date created, not date the transaction occured).
    }

    // returns list of ALL transactions in this account within the requested time period
    fetchTransactions(period) {
        // after fetchall, filter by account id and date created of transaction. #TODO
    }

    // filter transactions will be in a view model. This means filtering by period requires a server request but filtering by category or amount can be done on the client side. #TODO
};