// Not currently used because the only endpoint is a GET ALL
// Ensure account ID is an int and exists in the accounts data when creating or updating a transaction. #TODO

const { body, param, validationResult } = require('express-validator');

const AccountManager = require('../../models/orm-services/account-manager');
const accountManager = new AccountManager('./data/account-data.json');

// Helper to catch errors and prevent moving to the controller
const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

// Helper to check if account ID exists (accepts string or number)
const checkAccountExists = (value) => {
    return new Promise((resolve, reject) => {
        const intValue = parseInt(value, 10);
        if (isNaN(intValue) || !Number.isInteger(intValue)) {
            return reject('Account id must be an integer');
        }
        accountManager.fetchById(intValue, account => {
            if (!account) {
                return reject('Account id does not exist');
            }
            resolve();
        });
    });
};

module.exports = {
    checkIdExists: [
        param('id')
            .exists().withMessage('ID is required')
            .bail()
            .isInt().withMessage('ID must be an integer')
            .bail()
            .custom(checkAccountExists),
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            // Convert id param to integer for downstream use
            if (req.params && typeof req.params.id === 'string') {
                req.params.id = parseInt(req.params.id, 10);
            }
            next();
        }
    ]
};