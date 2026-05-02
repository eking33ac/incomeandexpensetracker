/* imports */
const path = require('path');
const express = require('express');

/* project's imports */
// const rootDir = require('../util/path');
const transactionsAPIController = require('../controllers/transactions-api');


/* Create router */
const router = express.Router();

/* Define transaction routes */
router.get('/transactions', transactionsAPIController.getTransactions);
// Matches a URL like: /api/transactions/1 (1 is the hypoethical transaction id)
router.get('/transactions/:id', transactionsAPIController.getTransactionById);



module.exports = router;