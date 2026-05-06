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

// Helper to check if account ID exists and is a true integer (not a string)
const checkAccountExists = (value) => {
    return new Promise((resolve, reject) => {
        // Reject if value is not a number type or not an integer
        if (typeof value !== 'number' || !Number.isInteger(value)) {
            return reject('Account id must be an integer (not a string)');
        }
        accountManager.fetchById(value, account => {
            if (!account) {
                return reject('Account id does not exist');
            }
            resolve();
        });
    });
};

module.exports = {
    checkIdExists: [
        body('accountId')
            .exists().withMessage('Acount ID is required')
            .bail()
            .custom((value) => {
                // Only accept if value is a number and integer
                if (typeof value !== 'number' || !Number.isInteger(value)) {
                    throw new Error('AccountID must be an integer (not a string)');
                }
                return true;
            })
            .bail()
            .custom(checkAccountExists),
        validate
    ]
};