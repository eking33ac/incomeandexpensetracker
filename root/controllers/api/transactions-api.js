/* imports */
const path = require('path');
const express = require('express');

/* project's imports */
// const rootDir = require('../util/path');
const TransactionManager = require('../../models/orm-services/transaction-manager');
const transactionManager = new TransactionManager('./data/transaction-data.json');


/* fetch all transactions */
exports.getTransactions = (req, res, next) => {
    transactionManager.fetchAll(allTransactions => {
        res.status(200).json(allTransactions); // optionally(?) parse and stringify json
    });
};

// /api/transactions/1 (1 is the hypoethical transaction id)
exports.getTransactionById = (req, res, next) => {
    const id = req.params.id; // access the id parameter from the URL 
    transactionManager.fetchById(id, transaction => {
        res.status(200).json(transaction);
    });
};

// Post/create a new transactions (status 201)
exports.postTransaction = (req, res, next) => {
    const newTransactionData = req.body; // access the new transaction data from the request body
    transactionManager.create(newTransactionData, newTransaction => {
        res.status(201).json(newTransaction);
    });
};

// Patch/update a transaction by id
exports.updateTransaction = (req, res, next) => {
    const id = req.params.id; // access the id parameter from the URL
    const updatedData = req.body; // access the updated transaction data from the request body
    transactionManager.updateById(id, updatedData, updatedTransaction => {
        res.status(200).json(updatedTransaction);
    });
};

// Delete a transaction by id
exports.deleteTransaction = (req, res, next) => {
    const id = req.params.id; // access the id parameter from the URL
    transactionManager.deleteById(id, message => {
        res.status(200).json(message);
    });
};