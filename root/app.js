/* Entry point for Node.js server. Sets up server, initializes middleware, and mounts routes. (not yet implemented) */

// Connect to MySQL database using mysql2 package

const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',  // Default user in XAMPP
  password: '',  // Default password (empty in XAMPP)
  database: 'moneytracker_db'
});

connection.connect(err => {
  if (err) throw err;
  console.log('✅ Connected to MySQL!');
});