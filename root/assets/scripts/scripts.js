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
        link script(s) // If needed, currently not
    */
    this.document.head.innerHTML += `
        <link rel="stylesheet" href="../assets/css/main.css">
        <link rel="stylesheet" href="../assets/css/accounts.css">
        <link rel="stylesheet" href="../assets/css/transactions.css">
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


function renderTransactionData(accountData, transactionData) {
    /* code to render transaction data */
    // get elements
    let transactionsTable = document.getElementsByClassName('transactions-table')[0];

    // add account name to each transaction based on the account id
    transactionData.forEach(transaction => {
        let account = accountData.find(account => account.id === transaction.accountId);

        transaction.accountName = account ? account.name : 'Unknown Account';
    });













    // Set table headers
    let headerRow = document.createElement('tr');
    if (transactionData.length > 0) {
        Object.keys(transactionData[0]).forEach(key => {
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