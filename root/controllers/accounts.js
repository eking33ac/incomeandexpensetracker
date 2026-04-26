/* accounts page controller functions */
// require presenter to render page with data #TODO are presenters even needed? Maybe just render the page with data in the controller? #TODO
// require account model to fetch accounts from file (to be database) and render to page. #TODO eventually move data fetching to a service or manager layer so controllers don't know about data fetching, but for now, put it here for testing purposes. #TODO
const AccountsManager = require('../models/domain-entities/account');


// create the page?
exports.getAccountsPage = (req, res, next) => {
    // fetch accounts
    AccountsManager.fetchAll(allAccounts => {
        res.status(200).render('accounts', {
            pageTitle: 'Accounts',
            path: '/accounts',
            accounts: allAccounts
        });
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