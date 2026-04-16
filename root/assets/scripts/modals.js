"use strict";

/* Create and manage transaction modals with client-side form validation */

function CreateModalNewTransaction(transactionType) {
    // create modal div
    const modalNewTransaction = document.createElement("div");
    modalNewTransaction.classList.add("modal");
    modalNewTransaction.id = "transaction-modal";

    // create modal-content div
    const modalContentDiv = document.createElement("div");
    modalContentDiv.classList.add("modal-content");
    modalNewTransaction.appendChild(modalContentDiv);

    // create modal-content header div
    const modalContentDivHeader = document.createElement("div");
    modalContentDivHeader.classList.add("modal-header");
    modalContentDiv.appendChild(modalContentDivHeader);

    // add close span and header to modal
    const closeSpan = document.createElement("span");
    closeSpan.classList.add("close");
    closeSpan.innerHTML = "&times;";
    // add checking the user wants to close it (if anything has been added by them)
    closeSpan.addEventListener('click', function() {
        modalNewTransaction.remove();
    });

    const modalHeaderText = document.createElement("h2");
    modalHeaderText.textContent = "New Transaction";

    modalContentDivHeader.appendChild(closeSpan);
    modalContentDivHeader.appendChild(modalHeaderText);





    // create form
    const form = document.createElement('form');
    form.classList.add('transaction-form');
    form.noValidate = true;

    function createField(labelText, input) {
        const wrapper = document.createElement('div');
        wrapper.classList.add('form-row');

        const label = document.createElement('label');
        label.textContent = labelText;
        label.appendChild(document.createElement('br'));
        label.appendChild(input);

        // display errors UNDER the appropriate fields
        const error = document.createElement('span');
        error.classList.add('field-error');

        wrapper.appendChild(label);
        wrapper.appendChild(error);

        return { wrapper, input, error };
    }

    // create input fields
    const typeInput = document.createElement('input');
    typeInput.type = 'text';
    typeInput.name = 'transactionType';
    typeInput.value = transactionType;
    typeInput.readOnly = true;

    const dateInput = document.createElement('input');
    dateInput.type = 'date';
    dateInput.name = 'transactionDate';
    dateInput.required = true;

    const amountInput = document.createElement('input');
    amountInput.type = 'number';
    amountInput.name = 'transactionAmount';
    amountInput.required = true;
    amountInput.step = '0.01';
    amountInput.min = '0.01';
    amountInput.placeholder = '0.00';

    // make this a drop down
    const accountInput = document.createElement('input');
    accountInput.type = 'text';
    accountInput.name = 'transactionAccount';
    accountInput.required = true;
    accountInput.placeholder = 'Account name';


    const typeField = createField('Transaction Type', typeInput);
    const dateField = createField('Date', dateInput);
    const amountField = createField('Amount', amountInput);
    const accountField = createField('Account', accountInput);

    form.appendChild(typeField.wrapper);
    form.appendChild(dateField.wrapper);
    form.appendChild(amountField.wrapper);
    form.appendChild(accountField.wrapper);

    // create action buttons
    const actions = document.createElement('div');
    actions.classList.add('modal-actions');

    const saveBtn = document.createElement('button');
    saveBtn.type = 'submit';
    saveBtn.textContent = 'Save Transaction';

    const cancelBtn = document.createElement('button');
    cancelBtn.type = 'button';
    cancelBtn.textContent = 'Cancel';
    cancelBtn.addEventListener('click', function() {
        modalNewTransaction.remove();
    });

    actions.appendChild(saveBtn);
    actions.appendChild(cancelBtn);
    form.appendChild(actions);
    modalContentDiv.appendChild(form);

    // validation logic
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

        const amountValue = parseFloat(amountInput.value);
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

    // clear errors on input
    [dateInput, amountInput, accountInput].forEach(input => {
        input.addEventListener('input', function() {
            if (input.classList.contains('invalid')) {
                input.classList.remove('invalid');
                const row = input.closest('.form-row');
                if (row) row.querySelector('.field-error').textContent = '';
            }
        });
    });

    // close modal when clicking outside
    window.onclick = function(event) {
        if (event.target === modalNewTransaction) {
            modalNewTransaction.remove();
        }
    };

    // Add modal to the page and display it
    document.body.appendChild(modalNewTransaction);
    modalNewTransaction.style.display = "block";
}
