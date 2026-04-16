// transactions
"use strict";

const main = document.querySelector("main");

function initTransactionsPage() {
    /* Fetch account data */
    fetch('../assets/data/account-data.json')
        .then(response => response.json())
        .then(accountData => {
            /* fetch transaction data */
            fetch('../assets/data/transaction-data.json')
                .then(response => response.json())
                .then(transactionData => {
                    setTransactionPage();
                    renderTransactionData(accountData, transactionData);
                })
                .catch(err => console.error('Transaction data load failed:', err));
        })
        .catch(err => console.error('Account data load failed:', err));
}

function setTransactionPage() {
    // Create add buttons container. This would ideally be in line with the header but probably will be just under it for now.
    const addBtnsContainer = document.createElement("div");
    addBtnsContainer.classList.add('add-btns-container');

    // Create "add income" button
    const addIncomeBtn = document.createElement("button");
    addIncomeBtn.classList.add("add-income-btn");
    addIncomeBtn.textContent = "Add Income";
    addIncomeBtn.addEventListener('click', () => CreateModalNewTransaction("income"));

    // Create "add expense" button
    const addExpenseBtn = document.createElement("button");
    addExpenseBtn.classList.add("add-expense-btn");
    addExpenseBtn.textContent = "Add Expense";
    addExpenseBtn.addEventListener('click', () => CreateModalNewTransaction("expense"));

    // Append new transaction buttons to their container
    addBtnsContainer.appendChild(addIncomeBtn);
    addBtnsContainer.appendChild(addExpenseBtn);





    // Create filters container
    // Add this to the transaction div with the table?
    const filtersContainer = document.createElement('div');
    filtersContainer.classList.add('filters-container');

    // Create transactions table
    const transactionsDiv = document.createElement('div');
    const transactionsTable = document.createElement('table');
    transactionsTable.classList.add('transactions-table');
    transactionsDiv.appendChild(transactionsTable);

    // append add buttons, filters container, and transactions to main
    main.appendChild(addBtnsContainer);
    main.appendChild(filtersContainer);
    main.appendChild(transactionsDiv);
}

function renderTransactionData(accountData, transactionData) {
    // get first occurance of element with class transactions-table
    const transactionsTable = document.querySelector('.transactions-table');


    if (accountData && transactionData) {
        // add account name to each transaction based on the account id and it appears after the transaction name (this is a stretch goal, but would be a nice visual touch)
        transactionData.forEach(transaction => {        
            let account = accountData.find(account => account.id === transaction.accountId);

            // if account is found, set transaction account name to account name, otherwise set it to "Unknown Account"
            transaction.accountName = account ? account.name : 'Unknown Account';
        });

        // Always set table headers
        const headerRow = document.createElement('tr');
        if (transactionData.length > 0) {
            Object.keys(transactionData[0]).forEach(key => {
                // skip transaction id and account id
                if (key === 'id' || key === 'accountId') return;

                const th = document.createElement('th');
                // Capitalize first letter (e.g., "Amount" instead of "amount")
                th.textContent = key.charAt(0).toUpperCase() + key.slice(1);
                headerRow.appendChild(th);
            });
            // add extra header for update column
            const updateTh = document.createElement('th');
            updateTh.textContent = 'Update';
            headerRow.appendChild(updateTh);
        } else {
            ['Type', 'Date', 'Amount', 'Description', 'Account', 'Update'].forEach(header => {
                const th = document.createElement('th');
                th.textContent = header;
                headerRow.appendChild(th);
            });
        }
        // Append header row to table
        transactionsTable.appendChild(headerRow);


        if (transactionData.length === 0) {
            // No transactions found
            const noTransactionsRow = document.createElement('tr');
            const noTransactionsCell = document.createElement('td');
            noTransactionsCell.colSpan = 6; // Span all columns
            noTransactionsCell.textContent = 'No transactions found. Add your first transaction to get started!';
            noTransactionsRow.appendChild(noTransactionsCell);
            transactionsTable.appendChild(noTransactionsRow);
        } else {
            // set table rows with transaction data, and also use account data to set the color of the row based on the account the transaction is associated with (this is a stretch goal, but would be a nice visual touch)
            transactionData.forEach(transaction => {
                const row = document.createElement('tr');
                Object.entries(transaction).forEach(([key, value]) => {
                    // skip transaction id and account id
                    if (key === 'id' || key === 'accountId') return;

                    const td = document.createElement('td');
                    td.textContent = value;
                    row.appendChild(td);
                });

                // Add edit and delete buttons to end of row
                const updateTd = document.createElement('td');
                const editBtn = document.createElement('button');
                editBtn.textContent = 'Edit';
                updateTd.appendChild(editBtn);
                const deleteBtn = document.createElement('button');
                deleteBtn.textContent = 'Delete';
                updateTd.appendChild(deleteBtn);
                row.appendChild(updateTd);

                transactionsTable.appendChild(row);
            });
        }
    } else {
        const noRecordsError = document.createElement("p");
        noRecordsError.innerHTML = "No records were found."
        transactionsDiv.appendChild(noRecordsError);
    }
}
