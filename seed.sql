/* seed.sql or seed.js / seed.py - populates the database with realistic test data */


--
-- Dumping data for table `account`
--

INSERT INTO `account` (`id`, `name`, `base_balance`, `display_color`) VALUES
(4, 'Checking', 1500.45, '3A8355'),
(5, 'Saving', 2500.00, '3A79B5'),
(6, 'Wallet', 3055.00, 'EEB564');


--
-- Dumping data for table `transaction`
--

INSERT INTO `transaction` (`id`, `name`, `amount`, `date`, `type`, `account_id`, `category`, `payment_method`) VALUES
(1, 'Popcorn Seller Salary', 652.34, '2026-05-08', 'income', 4, 'Salary', 'Bank Transfer'),
(2, 'Grocery Shopping', 50.32, '2026-05-09', 'expense', 4, 'Groceries', 'Card'),
(3, 'Electricity Bill', 124.56, '2026-05-14', 'expense', 4, 'Utilities', 'Bank Transfer'),
(4, 'Coffee', 5.97, '2026-05-08', 'expense', 6, 'Café', 'Cash'),
(5, 'Grocery Shopping', 67.55, '2026-05-26', 'expense', 4, 'Groceries', 'Card'),
(6, 'Water Bill', 64.39, '2026-05-24', 'expense', 4, 'Utilities', 'Bank Transfer'),
(7, 'Birthday Gift', 20.00, '2026-05-15', 'income', 6, 'Gifts', 'Cash'),
(8, 'Popcorn Seller Salary', 782.43, '2026-05-29', 'income', 4, 'Salary', 'Bank Transfer'),
(9, 'Gift Shopping', 58.97, '2026-05-24', 'expense', 4, 'Gifts', 'Card'),
(10, 'Halloween Candy', 36.57, '2026-09-30', 'expense', 6, 'Holiday', 'Cash');