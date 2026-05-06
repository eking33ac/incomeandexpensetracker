// data.js - Centralized data fetching for all site scripts

// Fetch account data
function getAccountsData() {
    return fetch('/api/accounts').then(r => r.json());
}

// Fetch transaction data
function getTransactionsData() {
    return fetch('/api/transactions').then(r => r.json());
}

// Fetch transaction by ID
function getTransactionById(transactionId) {
    return fetch(`/api/transactions/${transactionId}`).then(r => r.json());
}

// Post new transaction data
function postTransactionData(transaction) {
    return fetch('/api/transactions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(transaction)
    }).then(r => r.json());
}

function patchTransactionData(transactionId, updatedData) {
    return fetch(`/api/transactions/${transactionId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedData)
    }).then(r => r.json());
}

// Fetch categories data
function getCategoriesData() {
    return fetch('/api/categories').then(r => r.json());
}

// Fetch methods data
function getMethodsData() {
    return fetch('/api/methods').then(r => r.json());
}