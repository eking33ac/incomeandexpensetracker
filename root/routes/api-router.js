/* imports */
const path = require('path');
const express = require('express');

/* project's imports */
// const rootDir = require('../util/path');
const transactionsAPIController = require('../controllers/api/transactions-api');
const accountsAPIController = require('../controllers/api/accounts-api');
const categoriesAPIController = require('../controllers/api/categories-api');
const methodsAPIController = require('../controllers/api/methods-api');
const TransactionValidator = require('../middleware/validation/transaction-validation'); // Maybe move to be inside transaction controller model at some point? Idk. Okay here for now. #TODO


/* Create router */
const router = express.Router();

/* Define transactions routes */

// Get all transactions – No body. Eventual query parameters for filtering, sorting, pagination, etc. #TODO
router.get('/transactions', transactionsAPIController.getTransactions);
// Get transaction by id – No body, usually just validating the ID in the param
router.get('/transactions/:id', TransactionValidator.checkIdExists, transactionsAPIController.getTransactionById); // Matches a URL like: /api/transactions/1 (1 is the hypoethical transaction id)
// Post a new transaction – Validates the req body
router.post('/transactions', TransactionValidator.create, transactionsAPIController.postTransaction);
// Patch (update) a transaction by id – Validates ID and body
router.patch('/transactions/:id', TransactionValidator.update, transactionsAPIController.updateTransaction);
// Delete a transaction by id – Validates ID
router.delete('/transactions/:id', TransactionValidator.checkIdExists, transactionsAPIController.deleteTransaction);


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