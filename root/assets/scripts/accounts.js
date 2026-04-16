// accounts.js - Minimal accounts page logic
"use strict";

const main = document.querySelector("main");

function initAccountsPage() {
    /* fetch account data */
    fetch('../assets/data/account-data.json')
        .then(response => response.json())
        // Render account data
        .then(data => renderAccountData(data))
        .catch(err => console.error('Failed to load account data:', err));
}


function renderAccountData(accountsArray) {
    // Create accounts flexbox
    const accountsFlexbox = document.createElement('div');
    accountsFlexbox.classList.add('accounts-flexbox');

    if (accountsArray.length === 0) {
        // No accounts found
        const noAccountsMsg = document.createElement('p');
        noAccountsMsg.textContent = 'No accounts found. Add your first account to get started!';
        accountsFlexbox.appendChild(noAccountsMsg);
    } else {
        // For each account, create and append an account panel
        accountsArray.forEach(account => {
            const accountPanel = document.createElement('div');
            accountPanel.classList.add('account-panel');
            accountPanel.style.backgroundColor = account.color;

            // Account name
            const accountName = document.createElement('h2');
            accountName.classList.add('account-name', 'item');
            accountName.textContent = account.name;
            accountPanel.appendChild(accountName);

            // Account balance
            const accountBalance = document.createElement('p');
            accountBalance.classList.add('account-balance', 'item');
            accountBalance.textContent = `Balance: ${formatter.format(account.balance)}`;
            accountPanel.appendChild(accountBalance);

            // Delete button
            const deleteBtn = document.createElement('button');
            deleteBtn.classList.add('delete-btn', 'item');
            deleteBtn.textContent = 'Delete Account';
            deleteBtn.addEventListener('click', () => {
                alert(`Delete action currently unavailable. In the future, you would delete account with ID: ${account.id}`);
            });
            accountPanel.appendChild(deleteBtn);

            // View details button
            const viewDetailsBtn = document.createElement('button');
            viewDetailsBtn.classList.add('view-details-btn', 'item');
            viewDetailsBtn.textContent = 'View Details >';
            viewDetailsBtn.addEventListener('click', () => {
                alert(`View details action currently unavailable. In the future, you would navigate to the account details page for account with ID: ${account.id}`);
            });
            accountPanel.appendChild(viewDetailsBtn);

            // Append panel to flexbox
            accountsFlexbox.appendChild(accountPanel);
        });
    }

    // Append flexbox to main
    main.appendChild(accountsFlexbox);
}