/* dashboard page controller functions */

// create the page?
exports.getDashboardPage = (req, res, next) => {
    res.status(200).render('dashboard', {
        pageTitle: 'Dashboard',
        path: '/'
    });
}

exports.postDashboardPage = (req, res, next) => {
    // Save a new transaction?
    // console.log("ran postTransactionPage() function");
    // res.redirect('/dashboard');
}

exports.getDashboard = (req, res, next) => {
    // Get dashboard from json (to be database) and render to page
    // console.log("Ran getDashboard() function");

}