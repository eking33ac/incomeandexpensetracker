/* Base URL (I think) */
const path = require('path');

module.exports = path.dirname(process.mainModule.filename); // exports the directory name of the main module (the entry point of the application, which is app.js)