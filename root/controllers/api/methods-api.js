/* imports */
const path = require('path');
const express = require('express');

/* project's imports */
// const rootDir = require('../util/path');
const MethodManager = require('../../models/orm-services/method-manager');
const methodManager = new MethodManager('./data/method-data.json');


/* fetch all methods */
exports.getMethods = (req, res, next) => {
    methodManager.fetchAll(allMethods => {
        res.status(200).json(allMethods); // optionally(?) parse and stringify json
    });
};