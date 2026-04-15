/* TODO: 
    Add header, footer, and nav, then convert them to imports and exports in separate files.

    Add sandwich toggle 3 lines stacked thing, then also adjust sandwich toggle for media query
*/

"use strict";

let header = document.getElementsByTagName('header')[0];
let footer = document.getElementsByTagName('footer')[0];
let nav = document.getElementsByTagName('nav')[0];
let main = document.getElementsByTagName('main')[0];
let pageTitle = document.getElementsByTagName('title')[0].textContent;



// let dashboardLink = // this is in case I learn to add links with js to centeralize them that way, but for now I can just add them in the nav innerHTML (since all pages are in same directory)

// const title = "Hello World! This is a Slug";
// const slug = title
//   .toLowerCase()
//   .trim()
//   .replace(/[^\w\s-]/g, '') // Remove special chars
//   .replace(/[\s_-]+/g, '-') // Replace spaces/underscores with hyphens
//   .replace(/^-+|-+$/g, ''); // Trim leading/trailing hyphens
    

window.addEventListener('load', function() {
    /* check */
    // alert('window loaded');
    
    /* add head to document 
        link stylesheet(s)
        link script(s)
    */
    this.document.head.innerHTML += `
        <link rel="stylesheet" href="../assets/css/main.css">
        <link rel="stylesheet" href="../assets/css/accounts.css">
        <link rel="stylesheet" href="../assets/css/transactions.css">
        <link rel="stylesheet" href="../assets/css/modals.css">

        <script defer src="../assets/scripts/modals.js"></script>
        <script defer src="../assets/scripts/transactions.js></script>

    `;

    /* add header to document */
    header.innerHTML = `
        <h1>${pageTitle}</h1>
    `;

    /* add navigation to document */
    nav.innerHTML = `
        <!-- Nav links are currently relative to any file inside the pages directory -->
        <!-- If I decide to make navigation at the top of the page, re-add <span class="desktop">&nbsp;</span> after each link -->
        
        <btn id="hamburger-btn">&#9776</btn>
        <a href="dashboard.html">Dashboard</a>
        <a href="transactions.html">Transactions</a>
	    <a href="accounts.html">Accounts</a>
    `;

    /* add footer to document */
    footer.innerHTML = `
        <p>&copy; 2026 Income and Expense Tracker by Ezri King</p>
    `;

    /* Run anything using the elements added above AFTER they have been added */
    this.document.addEventListener('DOMContentLoaded', DOMLoaded());
});

function DOMLoaded() {
    /* check */
    // alert('DOM content loaded');

    /* Add event listers to hamburger button to toggle nav links on desktop */
    let hamburgerBtn = document.getElementById('hamburger-btn');

    /* add event listener to hamburger button to toggle nav links on desktop */
    hamburgerBtn.addEventListener('click', function() {
        /* test */
        console.log('hamburger button clicked');

        /* toggle nav links desktop */
        nav.classList.toggle('inactive');

        console.log('nav class list after toggle:', nav.classList);
    });



    /* Code for specific pages */    
    if (pageTitle === 'Dashboard') {
        /* code for dashboard page */
    } else if (pageTitle === 'Accounts') {
        /* code for accounts page */
        // fetch account data 
        fetch('../assets/data/account-data.json')
            .then(response => response.json()) // Parse the JSON response
            .then(data => {
                renderAccountData(data);
            })
            .catch(err => console.error('Data load failed:', err));
    } else if (pageTitle === 'Transactions') {
        /* code for transactions page */
        // fetch account data 
        fetch('../assets/data/account-data.json')
            .then(response => response.json()) // Parse the JSON response
            .then(data => {
                // set account data array
                let accountArr = data;


                // fetch transaction data
                fetch('../assets/data/transaction-data.json')
                    .then(response => response.json()) 
                    .then(data2 => {
                        let transactionArr = data2;

                        // Set Transaction Page Up
                        setTransactionPage();

                        // render data into page
                        renderTransactionData(accountArr, transactionArr);








                    })
                    .catch(err => console.error('Data load failed:', err));
            })
            .catch(err => console.error('Data load failed:', err));

        
    } else if (pageTitle === 'Account-Details') {
        /* code for account details page */
    }

};




function renderAccountData(accountsArray) {
    // create accounts flex box
    let accountsFlexbox = document.createElement('div');
    accountsFlexbox.classList.add('accounts-flexbox');

    // for each account, append a child flex item to the accounts flexbox
    accountsArray.forEach((account) => {
        let accountPanel = document.createElement('div');
        accountPanel.classList.add('account-panel');
        accountPanel.style.backgroundColor = account.color;
        
        // add account name, balance, and buttons to account panel
        let accountName = document.createElement('h2');
        accountName.classList.add('account-name');
        accountName.classList.add('item');
        accountName.textContent = account.name;
        accountPanel.appendChild(accountName);

        let accountBalance = document.createElement('p');
        accountBalance.classList.add('account-balance');
        accountBalance.classList.add('item');
        accountBalance.textContent = `Balance: ${formatter.format(account.balance)}`;
        accountPanel.appendChild(accountBalance);
        
        let deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-btn');
        deleteBtn.classList.add('item');
        deleteBtn.textContent = 'Delete Account';
        accountPanel.appendChild(deleteBtn);

        let viewDetailsBtn = document.createElement('button');
        viewDetailsBtn.classList.add('view-details-btn');
        viewDetailsBtn.classList.add('item');
        viewDetailsBtn.textContent = 'View Details >';
        accountPanel.appendChild(viewDetailsBtn);

        // Add event listeners to the buttons
        deleteBtn = accountPanel.children[2]; // Get the delete button
        deleteBtn.addEventListener('click', function() {
            // Handle account deletion logic here
            alert(`Delete action currently unavailable. In the future, you would delete account with ID: ${account.id}`);
        });
        viewDetailsBtn = accountPanel.children[3]; // Get the view details button
        viewDetailsBtn.addEventListener('click', function() {
            // Handle view details logic here
            alert(`View details action currently unavailable. In the future, you would navigate to the account details page for account with ID: ${account.id}`);
        });

        // append account panel to accounts flexbox
        accountsFlexbox.appendChild(accountPanel);
        });

    main.appendChild(accountsFlexbox);
};

function renderDashboardData() {
    /* code to render dashboard data */

}


function combineAccountAndTransactionData(accountData, transactionData) {
    /* code to combine account and transaction data */
    // for each
}

/* render the transaction table */
function renderTransactionData(accountData, transactionData) {
    /* code to render transaction data */
    // get elements
    let transactionsTable = document.getElementsByClassName('transactions-table')[0];

    // add account name to each transaction based on the account id and it appears after the transaction name (this is a stretch goal, but would be a nice visual touch)
    transactionData.forEach(transaction => {        
        let account = accountData.find(account => account.id === transaction.accountId);


        // if account is found, set transaction account name to account name, otherwise set it to "Unknown Account"
        transaction.accountName = account ? account.name : 'Unknown Account';
    });













    // Set table headers
    let headerRow = document.createElement('tr');
    if (transactionData.length > 0) {
        Object.keys(transactionData[0]).forEach(key => {
            if (key === 'id') return; // skip id since we don't need to display it
            if (key === 'accountId') return; // skip accountId since we are displaying accountName instead

            let th = document.createElement('th');
            th.textContent = key.charAt(0).toUpperCase() + key.slice(1); // Capitalize first letter (e.g., "Amount" instead of "amount")
            headerRow.appendChild(th);
        });
        // add extra header for update column
        let updateTh = document.createElement('th');
        updateTh.textContent = 'Update';
        headerRow.appendChild(updateTh);
    }

    // Append header row to table
    transactionsTable.appendChild(headerRow);

    // set table rows with transaction data, and also use account data to set the color of the row based on the account the transaction is associated with (this is a stretch goal, but would be a nice visual touch)
    transactionData.forEach(transaction => {
        let row = document.createElement('tr');
        Object.entries(transaction).forEach(([key, value]) => {
            if (key === 'id') return; // skip id since we don't need to display it
            if (key === 'accountId') return; // skip accountId since we are displaying accountName instead
            
            let td = document.createElement('td');
            td.textContent = value;
            row.appendChild(td);
        });

        // add edit and delete buttons to end of row
        let updateTd = document.createElement('td');
        let editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        updateTd.appendChild(editBtn);
        let deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        updateTd.appendChild(deleteBtn);
        row.appendChild(updateTd);

        transactionsTable.appendChild(row);
        console.log(`Transaction Row Added: ${JSON.stringify(row)}`);
    });
}

function setTransactionPage() {
    // get necessary variables
    let main = document.getElementsByTagName("main")[0];


    // Load Shared Page Data (currently at top of main.js, move to different file then import here? Or leave there?)


    // Create div to hold new transactions and buttons. This would ideally be in line with the header but probably will be just under it for now.
    let addBtnsContainer = document.createElement("div");
    addBtnsContainer.classList.add('add-btns-container');

    // Append buttons to the addBtnsContainer
    let addIncomeBtn = document.createElement("button");
    addIncomeBtn.classList.add("add-income-btn");
    addIncomeBtn.textContent = "Add Income";

    let addExpenseBtn = document.createElement("button");
    addExpenseBtn.classList.add("add-expense-btn");
    addExpenseBtn.textContent = "Add Expense";

    addBtnsContainer.appendChild(addIncomeBtn);
    addBtnsContainer.appendChild(addExpenseBtn);

    addIncomeBtn.addEventListener('click', () => CreateModalNewTransaction("income"));
    addExpenseBtn.addEventListener('click', () => CreateModalNewTransaction("expense"));

    // append add transaction buttons to the main element
    main.appendChild(addBtnsContainer);

    
    // Create container div for the row of filters
    let filtersContainer = document.createElement('div');
    filtersContainer.classList.add('filters-container');

    // create table div for the transactions table
    let transactionsDiv = document.createElement('div');

    // create transactions table
    let transactionsTable = document.createElement('table');
    transactionsTable.classList.add('transactions-table');




    // append filters to filters container



    // append table to its div
    transactionsDiv.appendChild(transactionsTable);

    // append filters container and transactions div to main
    main.appendChild(filtersContainer);
    main.appendChild(transactionsDiv);
}
















/* Helper functions, should be on different file */

// Format a number as currency
const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});


/* new/create transaction modal */
function CreateModalNewTransaction(transactionType) {
    // create modal div
    let modalNewTransaction = document.createElement("div");
    modalNewTransaction.classList.add("modal");
    modalNewTransaction.id = "transaction-modal";

    // create modal-content div
    let modalContentDiv = document.createElement("div");
    modalContentDiv.classList.add("modal-content");

    modalNewTransaction.appendChild(modalContentDiv);


    // create modal-content header div
    let modalContentDivHeader = document.createElement("div");
    modalContentDivHeader.classList.add("modal-header");

    modalContentDiv.appendChild(modalContentDivHeader);


    // add close span and header to modal
    let closeSpan = document.createElement("span");
    closeSpan.classList.add("close");
    closeSpan.innerHTML = "&times;"

    let modalHeaderText = document.createElement("h2");
    modalHeaderText.textContent = "New Transaction";

    modalContentDivHeader.appendChild(closeSpan);
    modalContentDivHeader.appendChild(modalHeaderText);

    // add onclick to close span
    closeSpan.addEventListener('click', function() {
        modalNewTransaction.style.display = "none";
    });

    


    // create input area (whatchamacallthis?)
    // The form below will contain all transaction input fields.

    // create input fields and add to input area
    let form = document.createElement('form');
    form.classList.add('transaction-form');
    form.noValidate = true;

    function createField(labelText, input) {
        let wrapper = document.createElement('div');
        wrapper.classList.add('form-row');

        let label = document.createElement('label');
        label.textContent = labelText;
        label.appendChild(document.createElement('br'));
        label.appendChild(input);

        let error = document.createElement('span');
        error.classList.add('field-error');

        wrapper.appendChild(label);
        wrapper.appendChild(error);

        return {wrapper, input, error};
    }

    let typeInput = document.createElement('input');
    typeInput.type = 'text';
    typeInput.name = 'transactionType';
    typeInput.value = transactionType;
    typeInput.readOnly = true;

    let dateInput = document.createElement('input');
    dateInput.type = 'date';
    dateInput.name = 'transactionDate';
    dateInput.required = true;

    let amountInput = document.createElement('input');
    amountInput.type = 'number';
    amountInput.name = 'transactionAmount';
    amountInput.required = true;
    amountInput.step = '0.01';
    amountInput.min = '0.01';
    amountInput.placeholder = '0.00';

    let accountInput = document.createElement('input');
    accountInput.type = 'text';
    accountInput.name = 'transactionAccount';
    accountInput.required = true;
    accountInput.placeholder = 'Account name';

    let typeField = createField('Transaction Type', typeInput);
    let dateField = createField('Date', dateInput);
    let amountField = createField('Amount', amountInput);
    let accountField = createField('Account', accountInput);

    form.appendChild(typeField.wrapper);
    form.appendChild(dateField.wrapper);
    form.appendChild(amountField.wrapper);
    form.appendChild(accountField.wrapper);

    let actions = document.createElement('div');
    actions.classList.add('modal-actions');

    let saveBtn = document.createElement('button');
    saveBtn.type = 'submit';
    saveBtn.textContent = 'Save Transaction';

    let cancelBtn = document.createElement('button');
    cancelBtn.type = 'button';
    cancelBtn.textContent = 'Cancel';
    cancelBtn.addEventListener('click', function() {
        modalNewTransaction.remove();
    });

    actions.appendChild(saveBtn);
    actions.appendChild(cancelBtn);
    form.appendChild(actions);
    modalContentDiv.appendChild(form);

    function clearErrors() {
        [dateField, amountField, accountField].forEach(field => {
            field.error.textContent = '';
            field.input.classList.remove('invalid');
        });
    }

    function validateForm() {
        clearErrors();
        let valid = true;

        if (!dateInput.value) {
            dateField.error.textContent = 'Please choose a date.';
            dateInput.classList.add('invalid');
            valid = false;
        }

        let amountValue = parseFloat(amountInput.value);
        if (!amountInput.value || Number.isNaN(amountValue) || amountValue <= 0) {
            amountField.error.textContent = 'Enter an amount greater than 0.';
            amountInput.classList.add('invalid');
            valid = false;
        }

        if (!accountInput.value.trim()) {
            accountField.error.textContent = 'Account name is required.';
            accountInput.classList.add('invalid');
            valid = false;
        }

        return valid;
    }

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        if (!validateForm()) return;
        alert(`Transaction ready: ${transactionType.toUpperCase()} ${formatter.format(parseFloat(amountInput.value))} on ${dateInput.value}`);
        modalNewTransaction.remove();
    });

    [dateInput, amountInput, accountInput].forEach(input => {
        input.addEventListener('input', function() {
            if (input.classList.contains('invalid')) {
                input.classList.remove('invalid');
                let row = input.closest('.form-row');
                if (row) row.querySelector('.field-error').textContent = '';
            }
        });
    });











    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modalNewTransaction) {
            modalNewTransaction.style.display = "none";
        }
    }

    // Add modal to the page and display it
    document.body.appendChild(modalNewTransaction);
    modalNewTransaction.style.display = "block";
};  