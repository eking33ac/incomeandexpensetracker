// data.js - Centralized data fetching for all site scripts

// Fetch account data
function getAccountsData() {
    return fetch('/api/accounts').then(r => r.json());
}

// Fetch transaction data
function getTransactionData() {
    return fetch('/api/transactions').then(r => r.json());
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

// Fetch categories data
function fetchCategoriesData() {
    return fetch('/api/categories').then(r => r.json());
}

// Fetch methods data
function fetchMethodsData() {
    return fetch('/api/methods').then(r => r.json());
}
