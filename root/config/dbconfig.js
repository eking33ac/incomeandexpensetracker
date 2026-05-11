/* Database Connection data array */

const mysql2 = require('mysql2/promise');

// set up database CONFIG, NOT CONNECTION
const config = ({
    host: 'localhost',
    user: 'root',
    password: "",
    database: 'moneytracker_db'
    // options: { // Idk what options do, just copied from https://www.telerik.com/blogs/step-by-step-create-node-js-rest-api-sql-server-database
    //     trustedConnection: true,
    //     enableArithAbort: true,
    //     instanceName: 'SQLEXPRESS' // Change if using a different instance name
    // }
});

// connect to the database
// connection.connect((err) => {
//     if (err) {
//         console.error('Error connecting to the database: ' + err.stack);
//         return;
//     }
//     console.log('Connected to MySQL database `moneytracker_db`.');

  
//     // close the connection
//     connection.end((err) => {
//         if (err) {
//             console.error('Error closing the database connection: ' + err.stack);
//             return;
//         }
//         console.log('Database connection closed.');
//     });
// });

const pool = mysql2.createPool(config);

module.exports = pool;