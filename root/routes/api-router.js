/* imports */
const path = require('path');
const express = require('express');

/* project's imports */
// const rootDir = require('../util/path');
const transactionsAPIController = require('../controllers/api/transactions-api');
const accountsAPIController = require('../controllers/api/accounts-api');
const categoriesAPIController = require('../controllers/api/categories-api');
const methodsAPIController = require('../controllers/api/methods-api');

/* Create router */
const router = express.Router();

/* Define transactions routes */

// Get all transactions
router.get('/transactions', transactionsAPIController.getTransactions);
// Get 1 transaction by id
router.get('/transactions/:id', transactionsAPIController.getTransactionById); // Matches a URL like: /api/transactions/1 (1 is the hypoethical transaction id)
// Post a new transaction #TODO: TEST then add validation
router.post('/transactions', transactionsAPIController.postTransaction);
// Patch (update) a transaction by id #TODO: TEST then add validation
router.patch('/transactions/:id', transactionsAPIController.updateTransaction);
// Delete a transaction by id #TODO: TEST then add validation
router.delete('/transactions/:id', transactionsAPIController.deleteTransaction);

/* Define accounts routes */
// Get all accounts
router.get('/accounts', accountsAPIController.getAccounts);

/* Define categories routes */
// Get all categories
router.get('/categories', categoriesAPIController.getCategories);

/* Define methods routes */
// Get all methods
router.get('/methods', methodsAPIController.getMethods);


/* Export router */
module.exports = router;