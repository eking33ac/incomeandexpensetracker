// require transaction model to fetch accounts from file (to be database) and render to page.
const TransactionManager = require('../models/orm-services/transaction-manager');
const transactionManager = new TransactionManager('./data/transaction-data.json');


/* transactions page controller functions */

// create the page?
exports.getTransactionsPage = (req, res, next) => {
    transactionManager.fetchAll(allTransactions => {
        res.status(200).render('transactions', {
            pageTitle: 'Transactions',
            path: '/transactions'
        });
    });
};

exports.postTransactionsPage = (req, res, next) => {
    // Save a new transaction?
    // console.log("ran postTransactionPage() function");
    // res.redirect('/transactions');
};

exports.getTransactions = (req, res, next) => {
  req.params.id; // access the id parameter from the URL
  res.send('API endpoint for transaction with id: ' + req.params.id);
};


/* transactions data controller functions */