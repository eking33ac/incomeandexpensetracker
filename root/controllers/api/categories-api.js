/* imports */
const path = require('path');
const express = require('express');

/* project's imports */
// const rootDir = require('../util/path');
const CategoryManager = require('../../models/orm-services/category-manager');
const categoryManager = new CategoryManager('./data/category-data.json');


/* fetch all categories */
exports.getCategories = (req, res, next) => {
    categoryManager.fetchAll(allCategories => {
        res.status(200).json(allCategories); // optionally(?) parse and stringify json
    });
};