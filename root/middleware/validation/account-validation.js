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
    ],
    create: [
        body('name').trim()
            .isString().withMessage('Name must be a string')
            .notEmpty().withMessage('Name is required')
            .isLength({ max: 50 }).withMessage('Name must be at most 50 characters'),
        body('base_balance')
            .isDecimal().withMessage('Base balance must be a decimal number'),
        body('display_color').trim()
            .isString().withMessage('Display color must be a string')
            .notEmpty().withMessage('Display color is required')
            .isLength({ max: 6 }).withMessage('Display color must be at most 6 characters'),
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                const fields = {};
                errors.array().forEach(err => {
                    if (err.param) {
                        fields[err.param] = err.msg;
                    } else {
                        fields['general'] = err.msg;
                    }
                });
                return res.status(400).json({ error: 'Validation failed', fields });
            }
            next();
        }
    ],
    update: [
        body('name').optional().trim()
            .isString().withMessage('Name must be a string')
            .notEmpty().withMessage('Name is required')
            .isLength({ max: 50 }).withMessage('Name must be at most 50 characters'),
        body('base_balance').optional()
            .isDecimal().withMessage('Base balance must be a decimal number'),
        body('display_color').optional().trim()
            .isString().withMessage('Display color must be a string')
            .notEmpty().withMessage('Display color is required')
            .isLength({ max: 6 }).withMessage('Display color must be at most 6 characters'),
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                const fields = {};
                errors.array().forEach(err => {
                    if (err.param) {
                        fields[err.param] = err.msg;
                    } else {
                        fields['general'] = err.msg;
                    }
                });
                return res.status(400).json({ error: 'Validation failed', fields });
            }
            next();
        }
    ]
};