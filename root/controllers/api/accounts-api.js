/* imports */
const path = require('path');
const express = require('express');

/* project's imports */
// const rootDir = require('../util/path');
const AccountsManager = require('../../models/orm-services/account-manager');
const accountsManager = new AccountsManager();


/* fetch all accounts */
exports.getAccounts = (req, res, next) => {
    accountsManager.fetchAll(allAccounts => {
        res.status(200).json(allAccounts); // optionally(?) parse and stringify json
    });
};