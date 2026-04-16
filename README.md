HELLO! This README is currently somewhat of a template for the final README and is being updated through development until it is a semi-proper README. It is currently not very useful.
I love you! K bye! <3



Income and Expense Tracker

This application will allow the user to input their income and expenses manually to track and overview their personal finances on their own computer. It is for a person who wishes to privately and inexpensively track their income and expenses to manage their finances. The intended user can be of any gender or age so long as they have the technical skill to set up and host the application.


How to run it:
To run this application, download the files from the github repo and open in a local server. The app has been created and tested in VSCode's Live Server, so that is the recommended host.
A local server is required to avoid CORS issues with fetch().


View inventory:
- Dashboard: This is the home screen. It contains nearly no content for now, just the title and "Hello Dashboard."
- Transactions: Reach this view by clicking the "Transactions" link in the sidebar navigation. If the navigation is not visible, click the three lines to make it visible and access the link.
This view contains a title, Add Income and Add Expense buttons, and a table of all transaction history.
- New Transaction: This is where you can create a new transaction. It contains a form with blank fields for each property of the transaction. Access it by clicking the Add Income or Add Expense button on the Transactions page.
- Edit Transaction: This is where you can update an existing transaction. It contains a form with filled fields for each property of the transaction.Access it on the Transactions page by clicking an "Edit" button at the end of any row in the Transaction table.
- Accounts: Reach this view by clicking the "Accounts" link in the sidebar navigation. If the navigation is not visible, click the three lines to make it visible and access the link.
This view contains a title and cards for each existing account. Each card displays the account name, balance, a Deletion button and a View Details button.
- Account-Detail: Currently not accessible unless you type the file name in the link itself. This view has the page title and the text "Hello Account Detail".


Known issues or limitations:
- Mobile View:
    - The navigation is visible when you first load in or switch pages, and the hamburger button needs to be pressed to actually view the page you navigated to.
    - On the transactions page, the table expands beyond the screen size
- Transactions Table:
    - Move Account Name to the beginning of the row and change to read "Account"
    - Currently, Transactions will show ALL transaction history no matter what, so if there were hundreds or thousands of records, they would ALL appear every time.
- Account value is not currently adjusted based on transaction history, making it inaccurate.
- Filters currently are neither visible nor functional on any page.
- Buttons to perform creation, updating, or deleting operations currently do such thing.
- On the Accounts page, the View Details button currently takes the user nowhere.


Changes from Phase 1 wireframes:
- There are changes in the order of table headers in the Transactions table largely because aesthetic fixes take time. Ideally, by the end of the project, they will match or otherwise be more intuitive.
- Most pages were created quickly, if at all, to meet the requirements by the front-end deadline. None are perfect, and many are missing. Ideally most of the website will match the wireframes by the end of development with features being excluded only as time demands.