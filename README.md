HELLO! This README will continue to be a work in progress throughout project development. It is currently in progress with untested How to Run It instructions, out of date Known Issues and Limitations, and a WIP Backend section.
I love you! K bye! <3

#### Notes

Instructions Created for Windows 10.
Everything excluding the Backend section and How to Run It is probably still only up to date as of 4/16/2026.

# Income and Expense Tracker

This application will allow the user to input their income and expenses manually to track and overview their personal finances on their own computer.  
It is for a person who wishes to privately and inexpensively track their income and expenses to manage their finances. The intended user can be of any gender or age so long as they have the technical skill to set up and host the application.

## How to Run It

To run this application, download the files from the GitHub repo and open in VSCode or your preferred code editor. The application has been created and tested in VSCode, so that is the recommendation. If you do not have it, install here: https://code.visualstudio.com/download

Open the VSCode terminal by clicking Terminal > New Terminal. Alternatively, click CTRL + ` on your keyboard. This command toggles the terminal on and off.

In the terminal, you should see which directory you are in. If you are in ...\incomeandexpensetracker>, type "cd root" to move into the root folder before installing dependancies.
Note: I have not yet tested the directory part of these instructions. If you find yourself in some other starting directory, navigate until you are in ...\incomeandexpensetracker\root>

In the terminal, install necessary dependancies. Instructions to install dependancies can be founder further in this document under Backend > Installing Dependancies.

Once dependancies have been installed, type "npm start" in the terminal and press enter. This will start the server on PORT 5000.

In a browser of your choice, open http://localhost:5000/dashboard. Explore the website from here.

Note: A local server is required to avoid CORS issues with fetch().

## View inventory

- **Dashboard:** This is the home screen. It contains nearly no content for now, just the title and "Hello Dashboard."
- **Transactions:** Reach this view by clicking the "Transactions" link in the sidebar navigation. If the navigation is not visible, click the three lines to make it visible and access the link.
This view contains a title, Add Income and Add Expense buttons, and a table of all transaction history.
- **New Transaction:** This is where you can create a new transaction. It contains a form with blank fields for each property of the transaction. Access it by clicking the Add Income or Add Expense button on the Transactions page.
- **Edit Transaction:** This is where you can update an existing transaction. It contains a form with filled fields for each property of the transaction.Access it on the Transactions page by clicking an "Edit" button at the end of any row in the Transaction table.
- **Delete Transaction:** This is where you can delete an existing transaction. Once implemented, you can access by pressing the "Delete" button at the end of any row on the Transactions page. A warning view will show you all details and ask if you are sure, and if you agree, an alert will replace the view to inform you if the deletion was successful.
- **Accounts:** Reach this view by clicking the "Accounts" link in the sidebar navigation. If the navigation is not visible, click the three lines to make it visible and access the link.
This view contains a title and cards for each existing account. Each card displays the account name, balance, a Deletion button and a View Details button.
- **Account-Detail:** Currently not accessible unless you type the file name in the link itself. This view has the page title and the text "Hello Account Detail".

## Known issues or limitations

- Mobile View:
    - The navigation is visible when you first load in or switch pages, and the hamburger button needs to be pressed to actually view the page you navigated to.
    - In addition to prior bullet, the main body container is still visible, meaning you can scroll horizontally and see the page even while hamburger button/navigation is active. (Class and id names may not perfectly match terms used in this bullet point)
    - On the transactions page, the table expands beyond the screen size
- Transactions Table:
    - Move Account Name to the beginning of the row and change to read "Account"
    - Currently, Transactions will show ALL transaction history no matter what, so if there were hundreds or thousands of records, they would ALL appear every time.
    - When updating a transaction, if the accountId is formatted incorrectly, the alert says undefined was updated successfully even with a 400 response from the server.
- Automatic updating on Transactions page after successful completion of a POST, PATCH, or DELETE currently refreshed the whole page instead of updating the data only.
- Account value is not currently adjusted based on transaction history, making it inaccurate.
- Filters currently are neither visible nor functional on any page.
- Buttons to perform creation, updating, or deleting operations currently do such thing.
- On the Accounts page, the View Details button currently takes the user nowhere.

## Changes from Phase 1 wireframes

- There are changes in the order of table headers in the Transactions table largely because aesthetic fixes take time. Ideally, by the end of the project, they will match or otherwise be more intuitive.
- Most pages were created quickly, if at all, to meet the requirements by the front-end deadline. None are perfect, and many are missing. Ideally most of the website will match the wireframes by the end of development with features being excluded only as time demands.

## Backend (5/5/2026)

### Installing Dependancies

Note: Installation instructions not yet tested.

Before setting up the project, ensure you have the following installed on your system:
*   **Node.js & NPM:** The runtime and package manager required to run the server.
    *   **Check installation:** Open Command Prompt or PowerShell and type:
        *   `node -v`
        *   `npm -v`
    *   If a version number (e.g., `v20.x.x`) appears, you are ready to proceed.

#### Project Dependencies
The application relies on the following packages (defined in `/root/package.json`):
*   **express**: The web framework for the API.
*   **ejs**: The templating engine for rendering views.
*   **body-parser**: Middleware to handle incoming request data.
    **express-validator**: Middleware for validating and sanitizing incoming request bodies and parameters.
    **mysql2**: Driver/library to connect to the MySQL database.
*   **nodemon** (Dev Dependency): Automatically restarts the server when code changes.

> **Note:** The versions defined in `/root/package.json` are what the application was built with. For guaranteed functionality, use these versions or newer (assuming backwards compatibility).

#### Installation Steps
1.  **Open the Terminal:** In VS Code, go to `Terminal > New Terminal` (or press ``Ctrl + ` ``).
2.  **Navigate to the Root:** Ensure your terminal path is in the project root directory where `package.json` is located.
3.  **Run the Install Command:** Type the following and press Enter:
    ```bash
    npm install
    ```
    *This command automatically reads `package.json` and installs all necessary dependencies into a `node_modules` folder.*


#### Starting the Application

Once the installation is complete, you can launch the server using the pre-configured script:

```bash
npm start
```

This will run the application using **Nodemon**, which will automatically refresh the server whenever you save changes to your files.

### Configuring the Server

### Configuration
By default, the server is configured to run on **Port 5000**. 
- To access the application, go to `http://localhost:5000` in your web browser.
- If you need to change the port, update the `PORT` variable at the bottom of `app.js`.


### Base URL and PORT for the Server

Port: 5000
URL: http://localhost:5000/

### API Summary

Full documentation is available in /root/API_DOCS.md

#### /transactions

GET /transactions
    Fetches JSON of all transactions for the frontend to turn into an array primarily used for presentation.

POST /transactions
    Sends a new transaction array to the server to be validated and turned into a new transaction entry.

#### /transactions/:id

GET /transactions/:id
    Fetches 1 transaction by transaction ID. Not currently implemented.

PATCH /transactions/:id
    Updates 1 transaction by transaction ID. New transaction information is sent in the head back to the server, validated, and on a success, returns a 200 success message.

DELETE /transactions/:id
    Deletes 1 transaction by transaction ID. Not currently implemented.

#### /accounts

GET /accounts
    Fetches JSON of all accounts for the frontend to turn into an array.

#### /categories

GET /categories
    Fetches JSON of all transaction categories for the frontend to turn into an array.

#### /methods

GET /methods
    Fetches JSON of all transaction payment methods for the frontend to turn into an array.

## Database Setup

Follow these steps to get your local environment running. This project uses MySQL (compatible with XAMPP/phpMyAdmin).

### Prerequisites: Database Server
This project requires a MySQL database. This application was run and tested locally using XAMPP. If you prefer a different platform, ignore this section and proceed with the MySQL server of your own whims. I wish you luck with them.

1. Download & Install XAMPP: Download here: https://www.apachefriends.org/index.html

2. Launch the Control Panel: Open the XAMPP Control Panel application.

3. Start MySQL: Click the Start button next to "MySQL".

    - Note: You do not need to start Apache for this project to work.

4. Keep it Running: Keep the XAMPP Control Panel open while you are developing or testing the app.

### 1. Configuration

Before running the app, ensure the database credentials match your local environment:

- Open root/config/dbconfig.js.
- Update the host, user, and password properties if they differ from the defaults (Default: localhost, root, no password).
- Note: Leave the database name the same. If you change it here, you also need to update it on line 25 of root/migration.sql
- Note: The app runs on PORT 5000 by default. To update this, go to the end of root/app.js. Update the line that reads `const PORT = 5000;` and change the number to any port you wish to run the application on.

### 2. Initialize the Database

You do not need to manually create the database in phpMyAdmin. We have provided a script that creates the database, sets up the tables, and populates them with test data automatically.

Run the following command in your terminal:
```bash
npm run db:init
```

**This will:**
- **Create the Database:** Executes CREATE DATABASE IF NOT EXISTS as defined in root/migration.sql
- **Run Migrations:** Builds necessary tables and constraints
- **Seed Data:** Inserts initial test data records from seed.sql

### 3. Starting the Server

Once the database is initialized, start the application:
```bash
npm start
```

### 4. Verifying the Connection

To verify the setup:

- Check the Terminal: You should see a message saying Server is running on port 5000 followed by a database connection success message.
    - Ex: 
    🚀 Server is running on port 5000
    ✅ Connected to MySQL Database: moneytracker_db

- Test the API: Open your browser (or Postman, if you prefer) and visit:
http://localhost:5000/api/transactions
    - Success: You should see the JSON data that was inserted during the seeding process.