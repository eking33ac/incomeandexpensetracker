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
    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.name = 'transactionName';
    nameInput.required = true;
    nameInput.placeholder = 'Transaction name';

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
    const accountSelect = document.createElement('select');
    accountSelect.name = 'transactionAccount';
    accountSelect.required = true;
    // Add default option
    const defaultAccountOption = document.createElement('option');
    defaultAccountOption.value = '';
    defaultAccountOption.textContent = 'Select an account';
    defaultAccountOption.disabled = true;
    defaultAccountOption.selected = true;
    accountSelect.appendChild(defaultAccountOption);
    // Fetch and populate accounts
    fetch('../assets/data/account-data.json')
        .then(response => response.json())
        .then(accounts => {
            accounts.forEach(account => {
                const option = document.createElement('option');
                option.value = account.id;
                option.textContent = account.name;
                accountSelect.appendChild(option);
            });
        })
        .catch(err => console.error('Failed to load accounts:', err));

    const categoryContainer = document.createElement('div');
    categoryContainer.classList.add('custom-select');
    categoryContainer.style.position = 'relative';
    const categoryButton = document.createElement('button');
    categoryButton.type = 'button';
    categoryButton.textContent = 'Select categories';
    categoryButton.style.width = '100%';
    categoryButton.style.textAlign = 'left';
    categoryButton.addEventListener('click', function(e) {
        e.preventDefault();
        categoryDropdown.style.display = categoryDropdown.style.display === 'block' ? 'none' : 'block';
    });
    categoryContainer.appendChild(categoryButton);
    const categoryDropdown = document.createElement('div');
    categoryDropdown.classList.add('custom-dropdown');
    categoryDropdown.style.display = 'none';
    categoryDropdown.style.position = 'absolute';
    categoryDropdown.style.top = '100%';
    categoryDropdown.style.left = '0';
    categoryDropdown.style.width = '100%';
    categoryDropdown.style.background = 'white';
    categoryDropdown.style.border = '1px solid #ccc';
    categoryDropdown.style.maxHeight = '200px';
    categoryDropdown.style.overflowY = 'auto';
    categoryContainer.appendChild(categoryDropdown);
    // Fetch and populate categories as checkboxes
    fetch('../assets/data/categories.json')
        .then(response => response.json())
        .then(categories => {
            categories.forEach(cat => {
                const label = document.createElement('label');
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.name = 'transactionCategory';
                checkbox.value = cat.id;
                checkbox.addEventListener('change', function() {
                    updateCategoryButton();
                    if (categoryContainer.classList.contains('invalid')) {
                        categoryContainer.classList.remove('invalid');
                        categoryField.error.textContent = '';
                    }
                });
                label.appendChild(checkbox);
                label.appendChild(document.createTextNode(cat.name));
                categoryDropdown.appendChild(label);
                categoryDropdown.appendChild(document.createElement('br'));
            });
        })
        .catch(err => console.error('Failed to load categories:', err));

    function updateCategoryButton() {
        const checkedBoxes = categoryDropdown.querySelectorAll('input[type="checkbox"]:checked');
        if (checkedBoxes.length === 0) {
            categoryButton.textContent = 'Select categories';
        } else {
            const names = Array.from(checkedBoxes).map(cb => cb.nextSibling.textContent.trim());
            categoryButton.textContent = names.join(', ');
        }
    }

    const methodSelect = document.createElement('select');
    methodSelect.name = 'transactionMethod';
    methodSelect.required = true;
    // Add default option
    const defaultMethodOption = document.createElement('option');
    defaultMethodOption.value = '';
    defaultMethodOption.textContent = 'Select a method';
    defaultMethodOption.disabled = true;
    defaultMethodOption.selected = true;
    methodSelect.appendChild(defaultMethodOption);
    // Fetch and populate methods
    fetch('../assets/data/methods.json')
        .then(response => response.json())
        .then(methods => {
            methods.forEach(method => {
                const option = document.createElement('option');
                option.value = method.id;
                option.textContent = method.name;
                methodSelect.appendChild(option);
            });
        })
        .catch(err => console.error('Failed to load methods:', err));


    const nameField = createField('Transaction Name', nameInput);
    const typeField = createField('Transaction Type', typeInput);
    const dateField = createField('Date', dateInput);
    const amountField = createField('Amount', amountInput);
    const accountField = createField('Account', accountSelect);
    // Category field (custom wrapper for checkboxes)
    const categoryWrapper = document.createElement('div');
    categoryWrapper.classList.add('form-row');
    const categoryLabel = document.createElement('label');
    categoryLabel.textContent = 'Category';
    categoryLabel.appendChild(document.createElement('br'));
    categoryLabel.appendChild(categoryContainer);
    const categoryError = document.createElement('span');
    categoryError.classList.add('field-error');
    categoryWrapper.appendChild(categoryLabel);
    categoryWrapper.appendChild(categoryError);
    const categoryField = { input: categoryContainer, error: categoryError };
    const methodField = createField('Method', methodSelect);

    form.appendChild(nameField.wrapper);
    form.appendChild(typeField.wrapper);
    form.appendChild(dateField.wrapper);
    form.appendChild(amountField.wrapper);
    form.appendChild(accountField.wrapper);
    form.appendChild(categoryWrapper);
    form.appendChild(methodField.wrapper);

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
        [nameField, dateField, amountField, accountField, categoryField, methodField].forEach(field => {
            if (field.input) field.input.classList.remove('invalid');
            field.error.textContent = '';
        });
    }

    function validateForm() {
        clearErrors();
        let valid = true;

        if (!nameInput.value.trim()) {
            nameField.error.textContent = 'Transaction name is required.';
            nameInput.classList.add('invalid');
            valid = false;
        }

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

        if (!accountSelect.value.trim()) {
            accountField.error.textContent = 'Account name is required.';
            accountSelect.classList.add('invalid');
            valid = false;
        }

        const checkedBoxes = categoryContainer.querySelectorAll('input[type="checkbox"]:checked');
        if (checkedBoxes.length === 0) {
            categoryField.error.textContent = 'Please select at least one category.';
            categoryContainer.classList.add('invalid');
            valid = false;
        }

        if (!methodSelect.value) {
            methodField.error.textContent = 'Please select a method.';
            methodSelect.classList.add('invalid');
            valid = false;
        }

        return valid;
    }

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        if (!validateForm()) return;
        const checkedBoxes = categoryContainer.querySelectorAll('input[type="checkbox"]:checked');
        const categoryNames = Array.from(checkedBoxes).map(cb => {
            const label = cb.parentElement;
            return label.textContent.trim();
        }).join(', ');
        const selectedMethodOption = methodSelect.options[methodSelect.selectedIndex];
        const methodName = selectedMethodOption.textContent;
        alert(`Transaction "${nameInput.value}" ready: ${transactionType.toUpperCase()} ${formatter.format(parseFloat(amountInput.value))} on ${dateInput.value} in ${categoryNames} via ${methodName}`);
        modalNewTransaction.remove();
    });

    // clear errors on input
    [nameInput, dateInput, amountInput, accountSelect].forEach(input => {
        input.addEventListener('input', function() {
            if (input.classList.contains('invalid')) {
                input.classList.remove('invalid');
                const row = input.closest('.form-row');
                if (row) row.querySelector('.field-error').textContent = '';
            }
        });
    });
    methodSelect.addEventListener('change', function() {
        if (methodSelect.classList.contains('invalid')) {
            methodSelect.classList.remove('invalid');
            const row = methodSelect.closest('.form-row');
            if (row) row.querySelector('.field-error').textContent = '';
        }
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
