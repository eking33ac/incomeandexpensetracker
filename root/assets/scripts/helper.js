/* Helper functions */
"use strict";

// Format a number as currency
const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});