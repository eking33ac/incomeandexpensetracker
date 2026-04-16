/* TODO: 
    Add header, footer, and nav, then convert them to imports and exports in separate files.

    Add sandwich toggle 3 lines stacked thing, then also adjust sandwich toggle for media query
*/

"use strict";
    
window.addEventListener('load', function() {
    /* Run anything using the elements added above AFTER they have been added */
    this.document.addEventListener('DOMContentLoaded', DOMLoaded());
});

function DOMLoaded() {
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
    } else if (pageTitle === 'Accounts') {
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


function combineAccountAndTransactionData(accountData, transactionData) {
    /* code to combine account and transaction data */
    // for each
}

     

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