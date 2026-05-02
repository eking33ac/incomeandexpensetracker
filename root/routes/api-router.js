/* imports */
const path = require('path');
const express = require('express');

/* project's imports */
// const rootDir = require('../util/path');
const transactionsAPIController = require('../controllers/transactions-api');


/* Create router */
const router = express.Router();

/* Define transaction routes */

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


module.exports = router;