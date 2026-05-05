

/* imports */
const path = require('path');
const express = require('express');

// Log incoming requests to server console for development purposes.
module.exports = (req, res, next) => {
    console.log(`${req.method} sent to ${req.url}`);
    next();
};