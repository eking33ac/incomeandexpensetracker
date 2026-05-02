/* imports */
const path = require('path');
const express = require('express');

/* project's imports */
// const rootDir = require('../util/path');
const TransactionManager = require('../models/orm-services/transaction-manager');
const transactionManager = new TransactionManager('./data/transaction-data.json');


/* Create router */
const router = express.Router();

/* api end point testing - transactions */

exports.getTransactions = (req, res, next) => {
    transactionManager.fetchAll(allTransactions => {
        res.status(200).json(allTransactions); // optionally(?) parse and stringify json
    });
}

// /api/transactions/1 (1 is the hypoethical transaction id)
exports.getTransactionById = (req, res, next) => {
    const id = req.params.id; // access the id parameter from the URL 
    transactionManager.fetchById(id, transaction => {
        res.status(200).json(transaction);
    });
};