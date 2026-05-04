// 'new' is part of the script name temporarily while the old transactions.js is still being used as a reference for programmers (not referenced anywhere in code)

"use strict";

function initTransactionsPage() {
    const addIncomeBtn = document.querySelector(".add-income-btn");
    const addExpenseBtn = document.querySelector(".add-expense-btn");
    // editBtn.dataset.transactionId = transaction.id;

    addIncomeBtn.addEventListener('click', () => CreateModalNewTransaction("income"));
    addExpenseBtn.addEventListener('click', () => CreateModalNewTransaction("expense"));
}


// TODO: Update Modal until this works, then see how to make this script only run on transactions page. Probably have a script to check what page we are on?
// TODO: Get POST working on this modal.
// Then add page update after POST. 
// Then add violation and error handling.
// Then add PATCH (edit transaction) and DELETE (delete transaction) functionality to the table rows on the page. This will likely require populating the table on the front end rather than in EJS so that we can add the buttons and event listeners to the rows. 
// Then add page update after PATCH and DELETE. Then add violation and error handling for those as well.
// Then ensure all api calls are returning correct status codes and messages, and add error handling for any failed API calls on the front end.
// Then ensure body parsing on all incoming API calls is part of the validation.
// from instructions: "Apply middleware for logging and JSON parsing as needed."
// Then check error message responses meet instruction step 4 example
// Then complete API_DOCS.md documentation (For ALL api calls, not just transactions)
// Then do the self-reflection
// then update the README.md
// Then check the instructions and realize we forgot 25 important things.