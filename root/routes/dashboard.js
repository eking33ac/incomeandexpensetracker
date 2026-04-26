/* Calls controller functions for appropriate routes/pages related to dashboard. */

/* imports */
const path = require('path');
const express = require('express');

/* project's imports */
// const rootDir = require('../util/path');
const dashboardController = require('../controllers/dashboard');

/* Create router */
const router = express.Router();

/* Define routes */
router.get('/', dashboardController.getDashboardPage);
// router.post('/dashboard', dashboardController.postAddDashboardPage);

/* Export router */
module.exports = router;