/* imports */
const { body, param, validationResult } = require('express-validator');

/* project's imports */
const TransactionManager = require('../../models/orm-services/transaction-manager');
const transactionManager = new TransactionManager('./data/transaction-data.json');

// Helper to catch errors and prevent moving to the controller
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Helper to check if transaction ID exists
const checkTransactionExists = (value) => {
  return new Promise((resolve, reject) => {
    transactionManager.fetchById(value, transaction => {
      if (!transaction) {
        return reject('Transaction id does not exist');
      }
      resolve();
    });
  });
};

// Helper to validate transaction type
// Returns true if value is 'income' or 'expense'
const isValidTransactionType = (value) => {
  return value === 'income' || value === 'expense';
};

// Helper to validate category is a non-empty array of strings
// Returns true if value is an array of non-empty strings
const isValidCategoryArray = (value) => {
  return Array.isArray(value) && value.length > 0 && value.every(item => typeof item === 'string' && item.trim() !== '');
};

module.exports = {
  checkIdExists: [
    param('id')
      .exists().withMessage('ID is required') // ensure ID was sent in the request parameters
      .bail() // if the ID doesn't exist, stop running further validations and return the error message
      .isInt({ gt: 0 }).withMessage('ID must be a positive number')
      .bail() // if the ID is not a valid positive integer, stop running further validations and return the error message
      .custom(checkTransactionExists), // custom validator to check if the transaction ID exists in the database
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        // Format errors as { fields: { fieldName: message } }
        const fields = {};
        errors.array().forEach(err => {
            if (fields[err.param]) { // if err.param is defined
                fields[err.param] = err.msg;
            } else { // if err.param is not defined, put it in a general errors field
                fields['id'] = err.msg;
            }
        });
        return res.status(400).json({ error: 'Validation failed', fields });
      }
      next();
    }
  ],
  create: [
    body('name')
      .isString().withMessage('Name must be a string')
      .notEmpty().withMessage('Name is required'),
    body('accountId')
      .isInt({ gt: 0 }).withMessage('Account ID must be greater than 0'),
    body('amount')
      .isFloat({ gt: 0 }).withMessage('Amount must be greater than 0'), // TODO change isfloat to isdecimal
    body('date')
      .isISO8601().withMessage('Date must be of type Date'),
    body('type')
      .custom(isValidTransactionType).withMessage('Type must be Income or Expense'),
    body('category')
      .custom(isValidCategoryArray).withMessage('Category must be a non-empty array of strings'),
    body('method')
      .isString().notEmpty().withMessage('Payment Method must be of type String'),
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
    param('id')
      .exists().withMessage('ID is required')
      .bail()
      .isInt({ gt: 0 }).withMessage('ID must be a positive number')
      .bail()
      .custom(checkTransactionExists),
    body('name')
      .optional()
      .isString().withMessage('Name must be a string')
      .notEmpty().withMessage('Name is required'),
    body('accountId')
      .optional()
      .isInt({ gt: 0 }).withMessage('Account ID must be greater than 0'),
    body('amount')
      .optional()
      .isFloat({ gt: 0 }).withMessage('Amount must be greater than 0'),
    body('date')
      .optional()
      .isISO8601().withMessage('Date must be of type Date'),
    body('type')
      .optional()
      .custom(isValidTransactionType).withMessage('Type must be Income or Expense'),
    body('category')
      .optional()
      .custom(isValidCategoryArray).withMessage('Category must be a non-empty array of strings'),
    body('method')
      .optional()
      .isString().notEmpty().withMessage('Payment Method must be of type String'),
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