/* imports */
const { body, param, validationResult } = require('express-validator');

/* project's imports */
const TransactionManager = require('../../models/orm-services/transaction-manager');
const transactionManager = new TransactionManager(); // No connection needed; transaction manager will use the transaction database module directly for database operations

// Helper to catch errors and prevent moving to the controller
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Helper to check if transaction ID exists, and propagate DB errors using a sentinel string
const checkTransactionExists = (value) => {
  return new Promise((resolve, reject) => {
    transactionManager.fetchById(value, (err, transaction) => {
      if (err) {
        // Use a special string to signal DB error
        return reject('__db_error__');
      }
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
      // Check for DB error in validation errors using sentinel string
      const dbError = errors.array().find(err => err.msg === '__db_error__');
      if (dbError) {
        return res.status(500).json({ error: 'Internal server error', fields: { id: 'Database error while validating transaction ID' } });
      }
      if (!errors.isEmpty()) {
        // Format errors as { fields: { fieldName: message } }
        const fields = {};
        errors.array().forEach(err => {
          if (err.param) {
            fields[err.param] = err.msg;
          } else {
            fields['id'] = err.msg;
          }
        });
        return res.status(400).json({ error: 'Validation failed', fields });
      }
      // Convert id param to integer for downstream use
      if (req.params && typeof req.params.id === 'string') {
        req.params.id = parseInt(req.params.id, 10);
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