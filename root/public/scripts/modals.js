"use strict";

/* Create and manage transaction modals with client-side form validation */

// Helper: Handle errors in responses for POST/PATCH requests and display them in the modal form
function handleTransactionErrors(response, fields, modal) {
    // Clear previous errors
    Object.values(fields).forEach(field => {
        if (field.input) field.input.classList.remove('invalid');
        if (field.error) field.error.textContent = '';
    });
    if (fields.general && fields.general.error) fields.general.error.textContent = '';

    if (response && response.error) {
        let handled = false;
        if (response.fields) {
            Object.entries(response.fields).forEach(([field, message]) => {
                if (fields[field]) {
                    fields[field].error.textContent = message;
                    fields[field].input.classList.add('invalid');
                    handled = true;
                }
            });
        }
        // If no field matched or no fields object, show a general error
        if (!handled && fields.general && fields.general.error) {
            fields.general.error.textContent = response.error;
        }
        return true;
    }
    return false;
}

// Helper: Create the basic modal structure
function createModalSkeleton() {
    const modal = document.createElement("div");
    modal.classList.add("modal");
    modal.id = "transaction-modal";
    const content = document.createElement("div");
    content.classList.add("modal-content");
    modal.appendChild(content);
    return { modal, content };
}

// Helper: Create and append the modal header
function createModalHeader(content, titleText = "New Transaction") {
    const header = document.createElement("div");
    header.classList.add("modal-header");
    const closeSpan = document.createElement("span");
    closeSpan.classList.add("close");
    closeSpan.innerHTML = "&times;";
    const title = document.createElement("h2");
    title.textContent = titleText;
    header.appendChild(closeSpan);
    header.appendChild(title);
    content.appendChild(header);
    return closeSpan; // Return for event attachment
}

// Helper: Create and append the form
function createForm(content) {
    const form = document.createElement('form');
    form.classList.add('transaction-form');
    form.noValidate = true;
    content.appendChild(form);
    return form;
}

// Helper: Generic field creator
function createField(labelText, input) {
    const wrapper = document.createElement('div');
    wrapper.classList.add('form-row');
    const label = document.createElement('label');
    label.textContent = labelText;
    label.appendChild(document.createElement('br'));
    label.appendChild(input);
    const error = document.createElement('span');
    error.classList.add('field-error');
    wrapper.appendChild(label);
    wrapper.appendChild(error);
    return { wrapper, input, error };
}

// Helper: Populate a select element from JSON data
function populateSelect(select, fetchDataCallback, valueProp, textProp, errorMessage = 'Failed to load options') {
    fetchDataCallback()
        .then(data => {
            data.forEach(item => {
                const option = document.createElement('option');
                option.value = item[valueProp];
                option.textContent = item[textProp];
                select.appendChild(option);
            });
        })
        .catch(err => console.error(`Failed to load ${errorMessage}:`, err));
}

// Helper: Create the custom category field
function createCategoryField() {
    const container = document.createElement('div');
    container.classList.add('custom-select');
    container.style.position = 'relative';
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = 'Select categories';
    button.style.width = '100%';
    button.style.textAlign = 'left';
    container.appendChild(button);
    const dropdown = document.createElement('div');
    dropdown.classList.add('custom-dropdown');
    dropdown.style.display = 'none';
    dropdown.style.position = 'absolute';
    dropdown.style.top = '100%';
    dropdown.style.left = '0';
    dropdown.style.width = '100%';
    dropdown.style.background = 'white';
    dropdown.style.border = '1px solid #ccc';
    dropdown.style.maxHeight = '200px';
    dropdown.style.overflowY = 'auto';
    container.appendChild(dropdown);

    // Populate categories
    getCategoriesData()
        .then(categories => {
            categories.forEach(cat => {
                const label = document.createElement('label');
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.name = 'transactionCategory';
                checkbox.value = cat.id;
                label.appendChild(checkbox);
                label.appendChild(document.createTextNode(cat.name));
                dropdown.appendChild(label);
                dropdown.appendChild(document.createElement('br'));
            });
        })
        .catch(err => console.error('Failed to load categories:', err));

    // Toggle dropdown
    button.addEventListener('click', e => {
        e.preventDefault();
        dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
    });

    // Update button text on checkbox change
    dropdown.addEventListener('change', () => {
        const checked = dropdown.querySelectorAll('input[type="checkbox"]:checked');
        button.textContent = checked.length ? Array.from(checked).map(cb => cb.nextSibling.textContent.trim()).join(', ') : 'Select categories';
    });

    return container;
}

// Helper: Create all form fields
function createFormFields(form, transactionType) {
    const fields = {};

    // General error field to put server errors in if server error doesn't match a field name
    fields.general = { error: document.createElement('div') };
    fields.general.error.classList.add('general-error');
    form.insertBefore(fields.general.error, form.firstChild);

    // Standard fields
    fields.name = createField('Transaction Name', Object.assign(document.createElement('input'), { type: 'text', name: 'transactionName', required: true, placeholder: 'Transaction name' }));
    fields.type = createField('Type', Object.assign(document.createElement('input'), { type: 'text', name: 'transactionType', value: transactionType, readOnly: true }));
    fields.date = createField('Date', Object.assign(document.createElement('input'), { type: 'date', name: 'transactionDate', required: true }));
    fields.amount = createField('Amount', Object.assign(document.createElement('input'), { type: 'number', name: 'transactionAmount', required: true, step: '0.01', min: '0.01', placeholder: '0.00' }));

    // Account select
    const accountSelect = document.createElement('select');
    accountSelect.name = 'transactionAccount';
    accountSelect.required = true;
    const defaultAccountOpt = document.createElement('option');
    defaultAccountOpt.value = '';
    defaultAccountOpt.textContent = 'Select an account';
    defaultAccountOpt.disabled = true;
    defaultAccountOpt.selected = true;
    accountSelect.appendChild(defaultAccountOpt);
    populateSelect(accountSelect, getAccountsData, 'id', 'name', 'Failed to load accounts');
    fields.account = createField('Account', accountSelect);

    // Category field (custom)
    const categoryContainer = createCategoryField();
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
    fields.category = { input: categoryContainer, error: categoryError, wrapper: categoryWrapper };

    // Method select
    const methodSelect = document.createElement('select');
    methodSelect.name = 'transactionMethod';
    methodSelect.required = true;
    const defaultMethodOpt = document.createElement('option');
    defaultMethodOpt.value = '';
    defaultMethodOpt.textContent = 'Select a method';
    defaultMethodOpt.disabled = true;
    defaultMethodOpt.selected = true;
    methodSelect.appendChild(defaultMethodOpt);
    populateSelect(methodSelect, getMethodsData, 'id', 'name', 'Failed to load methods');
    fields.method = createField('Method', methodSelect);

    
    // Append all fields
    Object.values(fields).forEach(field => {
        if (field.wrapper) form.appendChild(field.wrapper);
    });    
    // General error field to put server errors in if server error doesn't match a field name
    fields.general = { error: document.createElement('div') };
    fields.general.error.classList.add('general-error');
    form.insertBefore(fields.general.error, form.firstChild);

    return fields;
}

// Helper: Create action buttons
function createModalActions(form, saveText = 'Save Transaction', cancelText = 'Cancel') {
    const actions = document.createElement('div');
    actions.classList.add('modal-actions');
    const saveBtn = document.createElement('button');
    saveBtn.type = 'submit';
    saveBtn.textContent = saveText;
    const cancelBtn = document.createElement('button');
    cancelBtn.type = 'button';
    cancelBtn.textContent = cancelText;
    actions.appendChild(saveBtn);
    actions.appendChild(cancelBtn);
    form.appendChild(actions);
    return { saveBtn, cancelBtn };
}

// Helper: Set up validation
function setupValidation(form, fields, onSubmit) {
    function clearErrors() {
        Object.values(fields).forEach(field => {
            if (field.input) field.input.classList.remove('invalid');
            field.error.textContent = '';
        });
    }

    function validateForm() {
        clearErrors();
        let valid = true;

        if (!fields.name.input.value.trim()) {
            fields.name.error.textContent = 'Transaction name is required.';
            fields.name.input.classList.add('invalid');
            valid = false;
        }

        if (!fields.date.input.value) {
            fields.date.error.textContent = 'Please choose a date.';
            fields.date.input.classList.add('invalid');
            valid = false;
        }

        const amountValue = parseFloat(fields.amount.input.value);
        if (!fields.amount.input.value || Number.isNaN(amountValue) || amountValue <= 0) {
            fields.amount.error.textContent = 'Enter an amount greater than 0.';
            fields.amount.input.classList.add('invalid');
            valid = false;
        }

        if (!fields.account.input.value.trim()) {
            fields.account.error.textContent = 'Account name is required.';
            fields.account.input.classList.add('invalid');
            valid = false;
        }

        const checkedBoxes = fields.category.input.querySelectorAll('input[type="checkbox"]:checked');
        if (checkedBoxes.length === 0) {
            fields.category.error.textContent = 'Please select at least one category.';
            fields.category.input.classList.add('invalid');
            valid = false;
        }

        if (!fields.method.input.value) {
            fields.method.error.textContent = 'Please select a method.';
            fields.method.input.classList.add('invalid');
            valid = false;
        }

        return valid;
    }

    form.addEventListener('submit', event => {
        event.preventDefault();
        if (validateForm()) onSubmit(fields);
    });
}

// Helper: Set up event listeners for clearing errors and closing
function setupEventListeners(modal, fields, closeSpan, cancelBtn) {
    // Clear errors on input
    [fields.name.input, fields.date.input, fields.amount.input, fields.account.input].forEach(input => {
        input.addEventListener('input', () => {
            if (input.classList.contains('invalid')) {
                input.classList.remove('invalid');
                input.closest('.form-row').querySelector('.field-error').textContent = '';
            }
        });
    });
    fields.method.input.addEventListener('change', () => {
        if (fields.method.input.classList.contains('invalid')) {
            fields.method.input.classList.remove('invalid');
            fields.method.input.closest('.form-row').querySelector('.field-error').textContent = '';
        }
    });

    // Close modal
    closeSpan.addEventListener('click', () => modal.remove());
    cancelBtn.addEventListener('click', () => modal.remove());
    window.addEventListener('click', event => {
        if (event.target === modal) modal.remove();
    });
}

function CreateModalNewTransaction(transactionType) {
    // Main orchestration
    const { modal, content } = createModalSkeleton();
    const closeSpan = createModalHeader(content);
    const form = createForm(content);
    const fields = createFormFields(form, transactionType);
    const { cancelBtn } = createModalActions(form);    



    setupValidation(form, fields, (fields) => {
        const checkedBoxes = fields.category.input.querySelectorAll('input[type="checkbox"]:checked');
        const categoryNames = Array.from(checkedBoxes).map(cb => cb.nextSibling.textContent.trim()); // now an array
        const methodName = fields.method.input.options[fields.method.input.selectedIndex].textContent;

        // Create Transaction object with correct fields
        const newTransaction = {
            name: fields.name.input.value,
            type: transactionType,
            date: fields.date.input.value,
            amount: parseFloat(fields.amount.input.value),
            accountId: parseInt(fields.account.input.value),
            category: categoryNames, // now an array
            method: methodName // use the name, not the id
        };
        console.log("Posting transaction:", newTransaction);
        // Post to the server with the new transaction data
        postTransactionData(newTransaction)
            .then(response => {
                if (handleTransactionErrors(response, fields, modal)) return; // If there were validation errors from the server, handle them and stop here
                console.log("Server response:", response);
                alert(`Transaction "${response.name}" created successfully!`);
                modal.remove();
                // Optionally, refresh the transaction list or create the row
            })
            .catch(err => { // Generic error for now. In the future, could check error type/message and display specific messages for different cases (e.g. network error vs server validation error vs unexpected server error)
                console.error('Failed to create transaction:', err);
                alert('Failed to create transaction. Please try again.');
            });
        // Optionally, refresh the transaction list or create the row
    });
    setupEventListeners(modal, fields, closeSpan, cancelBtn);

    // Display modal
    document.body.appendChild(modal);
    modal.style.display = "block";
}

function CreateModalEditTransaction(transactionId) {
    // Fetch existing transaction data
    getTransactionsData()
        .then(transactions => {
            const transaction = transactions.find(t => t.id == transactionId);
            if (!transaction) {
                alert('Transaction not found');
                return;
            }

            // Main orchestration
            const { modal, content } = createModalSkeleton();
            const closeSpan = createModalHeader(content, 'Edit Transaction');
            const form = createForm(content);
            const fields = createFormFields(form, transaction.type);
            const { cancelBtn } = createModalActions(form, 'Update Transaction', 'Cancel');


            // Pre-populate fields
            fields.name.input.value = transaction.name;
            fields.date.input.value = transaction.date;
            fields.amount.input.value = transaction.amount;
            // Account: set selected option
            fields.account.input.value = transaction.accountId;

            // Categories: wait for checkboxes to be loaded before checking them
            function setCategoryCheckboxes() { // #TODO: These are not set. Just ask AI to find out why and fix it pretty easily.
                const categoryCheckboxes = fields.category.input.querySelectorAll('input[type="checkbox"]');
                if (categoryCheckboxes.length === 0) {
                    setTimeout(setCategoryCheckboxes, 50);
                    return;
                }
                categoryCheckboxes.forEach(cb => {
                    // Compare label text (category name) to transaction.category array
                    const labelText = cb.nextSibling && cb.nextSibling.textContent ? cb.nextSibling.textContent.trim() : '';
                    if (Array.isArray(transaction.category) && transaction.category.includes(labelText)) {
                        cb.checked = true;
                    }
                });
                // Update category button text
                const checked = fields.category.input.querySelectorAll('input[type="checkbox"]:checked');
                fields.category.input.querySelector('button').textContent = checked.length ? Array.from(checked).map(cb => cb.nextSibling.textContent.trim()).join(', ') : 'Select categories';
            }
            setCategoryCheckboxes();

            // Method: set selected
            fields.method.input.value = transaction.methodId; // Does this exist here?

            setupValidation(form, fields, (fields) => {
                const checkedBoxes = fields.category.input.querySelectorAll('input[type="checkbox"]:checked');
                const categoryNames = Array.from(checkedBoxes).map(cb => cb.nextSibling.textContent.trim()).join(', ');
                const methodName = fields.method.input.options[fields.method.input.selectedIndex].textContent;
                // Post to the server with the new transaction data
                const updatedTransaction = {
                    id: transaction.id,
                    name: fields.name.input.value,
                    type: transaction.type,
                    date: fields.date.input.value,
                    amount: parseFloat(fields.amount.input.value),
                    accountId: fields.account.input.value,
                    category: categoryNames, // This should ideally be an array of category IDs, but for simplicity we're just sending names here
                    methodId: fields.method.input.value
                };
                patchTransactionData(transaction.id, updatedTransaction)
                    .then(response => {
                        if (handleTransactionErrors(response, fields, modal)) return; // If there were validation errors from the server, handle them and stop here
                        alert(`Transaction "${response.name}" updated successfully!`);
                        modal.remove();
                        // Optionally, refresh the transaction list or create the row
                    })
                    .catch(err => {
                        console.error('Failed to update transaction:', err);
                        alert('Failed to update transaction. Please try again.');
                    });
                // Optionally, refresh the transaction list or create the row
            });
            setupEventListeners(modal, fields, closeSpan, cancelBtn);

            // Display modal
            document.body.appendChild(modal);
            modal.style.display = "block";
        })
        .catch(err => console.error('Failed to load transaction data:', err));
}