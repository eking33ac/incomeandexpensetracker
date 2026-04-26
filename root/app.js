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

/* create app */
const app = express();

/* Set up view engine */
app.set('view engine', 'ejs');
/* Set views directory */
app.set('views', path.join(__dirname, 'views')); // views is also the default, but if it changes in the project, change here

/* parse incoming request bodies */
app.use(bodyParser.urlencoded({ extended: false }));

/* Serve static files */
app.use(express.static(path.join(rootDir, 'public')));


/* Call routes */
app.use('/transactions',transactionRoutes);
app.use('/accounts',accountRoutes);
app.use('/dashboard',dashboardRoutes);
app.use('/account-detail', accountDetailRoutes);

app.use(errorController.get404Page);


/* Start server on port 5000 */
app.listen(5000);



// Connect to MySQL database using mysql2 package
// To be implemented in when database connection is needed. For now, data is stored in json files for development purposes.
/* const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',  // Default user in XAMPP
  password: '',  // Default password (empty in XAMPP)
  database: 'moneytracker_db'
});

connection.connect(err => {
  if (err) throw err;
  console.log('✅ Connected to MySQL!');
}); */