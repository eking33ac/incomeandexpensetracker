// 'new' is part of the script name temporarily while the old transactions.js is still being used as a reference for programmers (not referenced anywhere in code)

"use strict";


const addIncomeBtn = document.querySelector(".add-income-btn");
const addExpenseBtn = document.querySelector(".add-expense-btn");
// editBtn.dataset.transactionId = transaction.id;

addIncomeBtn.addEventListener('click', () => CreateModalNewTransaction("income"));
addExpenseBtn.addEventListener('click', () => CreateModalNewTransaction("expense"));


// TODO: Update Modal until this works, then see how to make this script only run on transactions page. Probably have a script to check what page we are on?