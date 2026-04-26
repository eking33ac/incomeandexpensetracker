/* Calls controller functions for appropriate routes/pages related to transactions. */

/* imports */
const path = require('path');
const express = require('express');

/* project's imports */
// const rootDir = require('../util/path');
const transactionsController = require('../controllers/transactions');

/* Create router */
const router = express.Router();

/* Define routes */
router.get('/', transactionsController.getTransactionsPage);
// router.post('/transactions', transactionController.postAddTransactionPage);

/* Export router */
module.exports = router;