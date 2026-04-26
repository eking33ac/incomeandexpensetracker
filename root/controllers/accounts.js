/* accounts page controller functions */

// create the page?
exports.getAccountsPage = (req, res, next) => {
    res.status(200).render('accounts', {
        pageTitle: 'Accounts',
        path: '/accounts'
    });
}

exports.postAccountsPage = (req, res, next) => {
    // Save a new transaction?
    // console.log("ran postTransactionPage() function");
    // res.redirect('/accounts');
}

exports.getAccounts = (req, res, next) => {
    // Get accounts from json (to be database) and render to page
    // console.log("Ran getAccounts() function");

}