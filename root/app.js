/* Entry point for Node.js server. Sets up server, initializes middleware, and mounts routes. */

/* imports */
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser'); // middleware

/* project's imports */
const rootDir = require('./util/path');
const errorController = require('./controllers/error');
// route imports
const transactionRoutes = require('./routes/transaction');
const accountRoutes = require('./routes/accounts');
const dashboardRoutes = require('./routes/dashboard');
const accountDetailRoutes = require('./routes/account-detail');
const apiRoutes = require('./routes/api-router');
// Middleware imports
const logger = require('./middleware/logger');
const jsonValidation = require('./middleware/validation/json-validation'); // Middleware for validating JSON request bodies for API routes. To be implemented when API routes are ready.
// Database imports
const dbconfig = require('./config/dbconfig');
const pool = dbconfig.pool; // Get the connection pool from the database configuration module


/* Test database connection and alert if connection succeeds or fails. */
pool.getConnection()
  .then(connection => {
    console.log('✅ Connected to MySQL Database:', dbconfig.DB_DATABASE);
    connection.release(); // Always release the connection back to the pool!
  })
  .catch(err => {
    console.error('❌ Database connection failed!');
    console.error('Error details:', err.message);
    process.exit(1); // Exit the application with an error code
  });




/* create app */
const app = express();

/* Set up view engine */
app.set('view engine', 'ejs');
/* Set views directory */
app.set('views', path.join(__dirname, 'views')); // views is also the default, but if it changes in the project, change here


/* parse incoming request bodies */
app.use(jsonValidation);

/* Middleware for logging requests - for development purposes */
app.use(logger);

/* Serve static files */
app.use(express.static(path.join(rootDir, 'public')));


/* Call page routes */
app.use('/transactions',transactionRoutes);
app.use('/accounts',accountRoutes);
app.use('/dashboard',dashboardRoutes);
app.use('/account-detail', accountDetailRoutes);
app.use('/api', apiRoutes); // Mount API routes under /api

app.use(errorController.get404Page);


// PORT
const PORT = 5000; //process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});