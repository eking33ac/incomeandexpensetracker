/* account-detail page controller functions */

// create the page?
exports.getAccountDetailPage = (req, res, next) => {
    res.status(200).render('account-detail', {
        pageTitle: 'Account Detail',
        path: '/account-detail'
    });
}

exports.postAccountDetailPage = (req, res, next) => {
    // Save a new transaction?
    // console.log("ran postTransactionPage() function");
    // res.redirect('/account-detail');
}

exports.getAccountDetail = (req, res, next) => {
    // Get account-detail from json (to be database) and render to page
    // console.log("Ran getAccountDetail() function");

}