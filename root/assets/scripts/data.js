// data.js - Centralized data fetching for all site scripts

// Fetch account data
function fetchAccountData() {
    return fetch('../assets/data/account-data.json').then(r => r.json());
}

// Fetch transaction data
function fetchTransactionData() {
    return fetch('../assets/data/transaction-data.json').then(r => r.json());
}

// Fetch categories data
function fetchCategoriesData() {
    return fetch('../assets/data/categories.json').then(r => r.json());
}

// Fetch methods data
function fetchMethodsData() {
    return fetch('../assets/data/methods.json').then(r => r.json());
}

// Generic fetch for select (used in modals.js)
function fetchDataUrl(dataUrl) {
    return fetch(dataUrl).then(r => r.json());
}
