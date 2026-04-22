// set node.js to run on port 5000
/* Express.js  version*/
// const express = require('express');
// const app = express();

// app.get('/', (req, res) => {
//     res.send('Hello from Node.js!');
// });

/* No framework version */
const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello from Node.js!');
});

server.listen(5000, () => {
    console.log('🚀 Server running at http://localhost:5000');
});