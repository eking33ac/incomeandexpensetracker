// data.js - Centralized data fetching for all site scripts

/* Define BASE_URL for API endpoints */
const API_BASE_URL = '/api';

// Fetch account data
function getAccountsData() {
    return fetch(`${API_BASE_URL}/accounts`).then(r => r.json());
}

// Fetch transaction data
function getTransactionsData() {
    return fetch(`${API_BASE_URL}/transactions`).then(r => r.json());
}

// Fetch transaction by ID
function getTransactionById(transactionId) {
    return fetch(`${API_BASE_URL}/transactions/${transactionId}`).then(r => r.json());
}

// Post new transaction data
function postTransactionData(transaction) {
    return fetch(`${API_BASE_URL}/transactions`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(transaction)
    }).then(r => r.json());
}

function patchTransactionData(transactionId, updatedData) {
    return fetch(`${API_BASE_URL}/transactions/${transactionId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedData)
    }).then(r => r.json());
}

// Delete transaction by ID
function deleteTransactionById(transactionId) {
    return fetch(`${API_BASE_URL}/transactions/${transactionId}`, {
        method: 'DELETE'
    }).then(r => r.json());
}

// Fetch categories data
function getCategoriesData() {
    return fetch(`${API_BASE_URL}/categories`).then(r => r.json());
}

// Fetch methods data
function getMethodsData() {
    return fetch(`${API_BASE_URL}/methods`).then(r => r.json());
}