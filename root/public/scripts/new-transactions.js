// 'new' is part of the script name temporarily while the old transactions.js is still being used as a reference for programmers (not referenced anywhere in code)

"use strict";

// Get references to needed elements on the page
const addIncomeBtn = document.querySelector(".add-income-btn");
const addExpenseBtn = document.querySelector(".add-expense-btn");
const transactionsDiv = document.querySelector(".transactions-div");
const getTransactionByIdBtn = document.querySelector(".get-transaction-by-id-btn"); // temp, for testing purposes

function initTransactionsPage() {
    setTransactionsPage();  // Add event listeners to the buttons to open the modals to add transactions
    populateTransactionsDiv();    // Fetch transactions data (and relevant lookup data) and render the transactions table in a forloop
}


// TODO:
// Start with updating the README. Should be easy for him to run it with npm start, but check on another device after SAaD.
// Then add page update after POST. (OPTIONALLY. We can also instruct user to refresh page after adding transaction, but that ain't ideal. <Secondarily, idk if we are being graded on that.>)
// Then add violation and error handling.
// Then add PATCH (edit transaction) and DELETE (delete transaction) functionality to the table rows on the page. (patch currently needs to have different fields sent back to the backend. If validation is created on the backend, errors should help us fix the frontend.)
// Then add page update after PATCH and DELETE. Then add violation and error handling for those as well, if not done previously.
// Then add error handling for any failed API calls on the front end.

// Then complete API_DOCS.md documentation (For ALL api calls, not just transactions). Remove TODO from them. Update POST transaction lookups to string or id and int, whichever gets used.
// Add API validation and docs for accounts, categories, and methods if not already done. (Should be easy to copy and paste from transactions, since they only have fetchALL)
// Then do the self-reflection
// Then check the instructions and realize we forgot 25 important things.

function setTransactionsPage() {
    // use buttons fetched at top of script to add event listeners for opening the modals to add transactions
    addIncomeBtn.addEventListener('click', () => CreateModalNewTransaction("income"));
    addExpenseBtn.addEventListener('click', () => CreateModalNewTransaction("expense"));
    getTransactionByIdBtn.addEventListener('click', () => { // temp, for testing purposes
        const transactionId = prompt("Enter transaction ID:");
        if (transactionId) {
            getTransactionById(transactionId)
                .then(transaction => {
                    if (transaction) {
                        alert(`Transaction ID: ${transaction.id}\nName: ${transaction.name}\nAmount: ${transaction.amount}\nDate: ${transaction.date}\nType: ${transaction.type}`);
                    } else {
                        alert('Transaction not found');
                    }
                })
                .catch(err => {
                    console.error('Failed to fetch transaction:', err);
                    alert('Failed to fetch transaction. Please try again.');
                });
        }
    });
}

// Get necessary data and call renderTransactionsData() (currently renders table. // Will eventually also render filters. This can also serve as a refresh function, I hope. Need to check that. #TODO)
function populateTransactionsDiv() {
    // Fetch transactions data, account data, categories data, payment methods data, income/expense data (eventually, once connected to Type db/once that json file exists)
    // TODO: Make fetchAll function in data.js to call here and in modal creation to get all data with one function call. ... Maybe, because transactions aren't need when getting the modals. Would the modal know about the data if we called it in this script? Not part of this function, but we could have a function to fetch all data like an allPagesInit().
    getAccountsData()
        .then(accountsData => {
            getTransactionsData()
                .then(transactionsData => {
                    getCategoriesData()
                        .then(categoriesData => {
                            getMethodsData()
                                .then(methodsData => {
                                    // then render the table with all the data
                                    renderTransactionsData(accountsData, transactionsData, categoriesData, methodsData);
                                })
                                .catch(err => console.error('Payment methods data load failed:', err));
                        })
                        .catch(err => console.error('Categories data load failed:', err));
                    // then render the table with all the data
                })
                .catch(err => console.error('Transaction data load failed:', err));
        })
        .catch(err => console.error('Account data load failed:', err));
}


/* Render Transactions Data */ // (currently only uses account and transactions information, not categories or methods, but those will be needed eventually when we have the type and category ids in the transactions data. #TODO)
function renderTransactionsData(accountsData, transactionsData, categoriesData, methodsData) {
    createTransactionsTable(); // create the table and header row, then append to transactionsDiv

    /* Future Functions */
    // createTransactionsCharts -- To be implemented, not on this page though. only on dashboard and account-detail. Commented here for memory purposes, because those functions will look very similar.
    // createTransactionsFilters // To be implemented
    // Implement other functions to create all the Transactions panels. And eventually the flexbox/grid div to hold them, currently nonexistent.



    /* Functions called above are defined here to be inside the same scope and access the data arguments. */

    function createTransactionsTable() {
        // Create transactions table
        const transactionsTable = document.createElement('table');
        transactionsTable.classList.add('transactions-table');
        transactionsDiv.appendChild(transactionsTable); // append table to the transactionsDiv


        // Ensure account and transaction data are available before rendering /* A good programmer would move validation to a different method, and then error messages in to a DIFFERENT different method, called in renderTransactionTable() before creating the table or anything. #TODO eventually man. */
        if (!accountsData || accountsData.length === 0) {
            // Create no accounts error message to prompt user to create account before adding transactions
            const noRecordsError = document.createElement("p");
            noRecordsError.innerHTML = "No accounts found. Please add an account before adding transactions."
            transactionsDiv.appendChild(noRecordsError);
            return false;
        } else if (!transactionsData || transactionsData.length === 0) {
            // Create no transactions error message
            const noRecordsMessage = document.createElement("p");
            noRecordsMessage.innerHTML = "No transactions found. Add your first transaction to get started!";
            transactionsDiv.appendChild(noRecordsMessage);
        } else { // Set transactions table
            createTransactionsTableHeader();
            createTransactionsTableRows();
        }



        /* Define createTransactionsTableHeader and createTransactionsTableRows functions here to have access to the accountsData and transactionsData arguments passed to renderTransactionsData() */

        function createTransactionsTableHeader() {
            /* Set transactions table header row */ // TODO: ID is not currently saved with the row. Might not be relevant as the table creations may be done by a script in the future.
            const headerRow = document.createElement('tr'); 
            if (transactionsData.length > 0) {
                Object.keys(transactionsData[0]).forEach(key => {
                    // skip transaction id and account id
                    if (key === 'id' || key === 'accountId') return;

                    const th = document.createElement('th');
                    // Capitalize first letter (e.g., "Amount" instead of "amount")
                    th.textContent = key.charAt(0).toUpperCase() + key.slice(1);
                    headerRow.appendChild(th);
                });
            } else {
                ['Name', 'Amount', 'Date', 'Type', 'Category', 'Method'].forEach(header => {
                    const th = document.createElement('th');
                    th.textContent = header;
                    headerRow.appendChild(th);
                });
            }
            // add extra header for account name and update column
            const updateTh = document.createElement('th');
            updateTh.textContent = 'Update';
            const accountNameTh = document.createElement('th');
            accountNameTh.textContent = 'Account Name';
            headerRow.appendChild(accountNameTh);
            headerRow.appendChild(updateTh);

            // Append header row to table
            transactionsTable.appendChild(headerRow);
        }

        function createTransactionsTableRows() {
            // set table rows with transaction data, and also use account data to set the color of the row based on the account the transaction is associated with (this is a stretch goal, but would be a nice visual touch)
            transactionsData.forEach(transaction => {
                // Create row for transaction
                const row = document.createElement('tr');
                Object.entries(transaction).forEach(([key, value]) => {
                    // skip transaction id and account id
                    if (key === 'id' || key === 'accountId') return;

                    const td = document.createElement('td');

                    // if (key === 'categoryId') { // This is where we would check what the key is and replace the value with the category name, method name, or type name instead of the id. #TODO
                    // This is also where we add back the helper formatter to money if key === amount #TODO
                    td.textContent = value;
                    row.appendChild(td);
                });



                

                // Find account name and append to row
                let account = accountsData.find(account => account.id === transaction.accountId);
                const accountNameTd = document.createElement('td');
                accountNameTd.textContent = account ? account.name : 'Unknown Account';
                row.appendChild(accountNameTd);







                // Add edit and delete buttons to end of row
                const updateTd = document.createElement('td');

                const editBtn = document.createElement('button');
                editBtn.textContent = 'Edit';
                editBtn.classList.add('edit-btn');
                // Attach transaction ID as a data attribute for later use
                editBtn.dataset.transactionId = transaction.id; // Should add validation to ensure there is an id. #TODO
                editBtn.addEventListener('click', function() {
                    CreateModalEditTransaction(transaction.id);
                });

                const deleteBtn = document.createElement('button');
                deleteBtn.textContent = 'Delete';
                deleteBtn.classList.add('delete-btn');
                // Attach transaction ID as a data attribute for later use
                deleteBtn.dataset.transactionId = transaction.id; // Should add validation to ensure there is an id. #TODO
                deleteBtn.addEventListener('click', function() {
                    // Use transaction.name for a better confirmation message
                    CreateModalDeleteTransaction(transaction.id, transaction.name || 'this transaction');
                });


                updateTd.appendChild(editBtn);
                updateTd.appendChild(deleteBtn);
                row.appendChild(updateTd);
                

                transactionsTable.appendChild(row);
            });
        }
    }
}