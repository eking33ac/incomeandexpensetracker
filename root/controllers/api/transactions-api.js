/* imports */
const path = require('path');
const express = require('express');

/* project's imports */
// const rootDir = require('../util/path');
const TransactionManager = require('../../models/orm-services/transaction-manager');
const transactionManager = new TransactionManager(); // No connection needed; transaction manager will use the transaction database module directly for database operations');


/* fetch all transactions */
exports.getTransactions = (req, res, next) => {
    transactionManager.fetchAll((err, allTransactions) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ message: 'Internal server error', error: err.message });
        }
        res.status(200).json(allTransactions); // optionally(?) parse and stringify json
    });
};

// /api/transactions/1 (1 is the hypoethical transaction id)
exports.getTransactionById = (req, res, next) => {
    const id = req.params.id; // access the id parameter from the URL
    transactionManager.fetchById(id, (err, transaction) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ message: 'Internal server error', error: err.message });
        }
        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }
        res.status(200).json(transaction);
    });
};

// Post/create a new transactions (status 201)
exports.postTransaction = (req, res, next) => {
    const newTransactionData = req.body; // access the new transaction data from the request body
    transactionManager.create(newTransactionData, (err, newTransaction) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ message: 'Internal server error', error: err.message });
        }
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
    transactionManager.deleteById(id, (err, result) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ message: 'Internal server error', error: err.message });
        }
        if (!result) {
            return res.status(404).json({ message: 'Transaction not found' });
        }
        res.status(200).json(result);
    });
};