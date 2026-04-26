/* Calls controller functions for appropriate routes/pages related to accounts. */

/* imports */
const path = require('path');
const express = require('express');

/* project's imports */
// const rootDir = require('../util/path');
const accountsController = require('../controllers/accounts');

/* Create router */
const router = express.Router();

/* Define routes */
router.get('/', accountsController.getAccountsPage);
// router.post('/accounts', accountsController.postAddAccountsPage);

/* Export router */
module.exports = router;