/* imports */
const path = require('path');
const express = require('express');

/* project's imports */
// const rootDir = require('../util/path');
const transactionsAPIController = require('../controllers/transactions-api');


/* Create router */
const router = express.Router();

/* Define routes */
router.get('/transactions', transactionsAPIController.getTransactions);
router.get('/transactions/:id', transactionsAPIController.getTransactionById);
