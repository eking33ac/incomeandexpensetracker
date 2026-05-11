/* project imports */
// require transaction model to fetch accounts from file (to be database) and render to page.
const TransactionManager = require('../models/orm-services/transaction-manager');
const transactionManager = new TransactionManager(); // No connection needed; transaction manager will use the transaction database module directly for database operations');
// require account model to fetch accounts from file (to be database) and render to page. #TODO eventually move data fetching to a service or manager layer so controllers don't know about data fetching, but for now, put it here for testing purposes. #TODO
const AccountsManager = require('../models/domain-entities/account-model');
// const accountManager = new AccountManager('./data/account-data.json');


/* transactions page controller functions */

// create the page?
exports.getTransactionsPage = (req, res, next) => {
    transactionManager.fetchAll(allTransactions => {
        AccountsManager.fetchAll(allAccounts => {
            res.status(200).render('transactions', {
                pageTitle: 'Transactions',
                path: '/transactions',
                transactions: allTransactions,
                accounts: allAccounts
            });
        });
    });
};

exports.postTransactionsPage = (req, res, next) => {
    // Save a new transaction?
    // console.log("ran postTransactionPage() function");
    // res.redirect('/transactions');
};


/* transactions data controller functions */