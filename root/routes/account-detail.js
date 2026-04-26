/* Calls controller functions for appropriate routes/pages related to account-detail. */

/* imports */
const path = require('path');
const express = require('express');

/* project's imports */
// const rootDir = require('../util/path');
const accountDetailController = require('../controllers/account-detail');

/* Create router */
const router = express.Router();

/* Define routes */
router.get('/', accountDetailController.getAccountDetailPage);
// router.post('/account-detail', accountDetailController.postAddAccountDetailPage);

/* Export router */
module.exports = router;