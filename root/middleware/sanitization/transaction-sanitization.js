// Pure function for transaction data sanitization
function sanitizeTransactionData(data) {
  const sanitized = { ...data };
  if (typeof sanitized.name === 'string') {
    sanitized.name = sanitized.name.trim();
  }
  // Add more field sanitization as needed
  return sanitized;
}

// Express middleware that applies the pure function to req.body
function sanitizeTransactionInput(req, res, next) {
  if (req.body && typeof req.body === 'object') {
    req.body = sanitizeTransactionData(req.body);
  }
  next();
}

module.exports = {
  sanitizeTransactionInput,
  sanitizeTransactionData
};
