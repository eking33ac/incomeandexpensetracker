

/* transactions page controller functions */

// create the page?
exports.getTransactionsPage = (req, res, next) => {
    res.status(200).render('transactions', {
        pageTitle: 'Transactions',
        path: '/transactions'
    });
}

exports.postTransactionsPage = (req, res, next) => {
    // Save a new transaction?
    // console.log("ran postTransactionPage() function");
    // res.redirect('/transactions');
}

exports.getTransactions = (req, res, next) => {
    // Get transactions from json (to be database) and render to page
    // console.log("Ran getTransactions() function");

}


/* transactions data controller functions */