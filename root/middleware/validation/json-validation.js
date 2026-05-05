/* imports */
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const jsonParser = express.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = (req, res, next) => {
    // First parse urlencoded, then JSON
    urlencodedParser(req, res, function(err) {
        if (err) return next(err);
        jsonParser(req, res, next);
    });
};