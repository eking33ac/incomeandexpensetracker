/* Entry point for Node.js server. Sets up server, initializes middleware, and mounts routes. */

/* imports */
const express = require('express');

/* project's imports */

// create app
const app = express();













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