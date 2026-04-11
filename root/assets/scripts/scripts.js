/* TODO: 
    Add header, footer, and nav, then convert them to imports and exports in separate files.

    Add sandwich toggle 3 lines stacked thing, then also adjust sandwich toggle for media query
*/

"use strict";

let header = document.getElementsByTagName('header')[0];
let footer = document.getElementsByTagName('footer')[0];
let nav = document.getElementsByTagName('nav')[0];
let pageTitle = document.getElementsByTagName('title')[0].textContent;

let dashboardLink = 

// const title = "Hello World! This is a Slug";
// const slug = title
//   .toLowerCase()
//   .trim()
//   .replace(/[^\w\s-]/g, '') // Remove special chars
//   .replace(/[\s_-]+/g, '-') // Replace spaces/underscores with hyphens
//   .replace(/^-+|-+$/g, ''); // Trim leading/trailing hyphens
    

window.addEventListener('load', function() {
    /* add head to document 
        link stylesheet(s)
        link script(s)
    */
    this.document.head.innerHTML += `
        <link rel="stylesheet" href="../assets/css/styles.css">
    `;

    /* add header to document */
    header.innerHTML = `
        <h1>${pageTitle}</h1>
    `;

    /* add navigation to document */
    nav.innerHTML = `
        <!-- Figure out how to do that three-lines-stacked toggle -->
        <!-- Nav links are currently relative to any file inside the pages directory -->
        <!-- If I decide to make navigation at the top of the page, I can re-add <span class="desktop">&nbsp;</span> after each link -->
        <!-- Nav should be in a vertical column on the left side of the page -->
        <nav class="nav-toggle">
            <a href="dashboard.html">Dashboard</a>
            <a href="transactions.html">Transactions</a>
			<a href="accounts.html">Accounts</a>
		</nav>
    `;

    /* add footer to document */
    footer.innerHTML = `
        <p>&copy; 2026 Income and Expense Tracker by Ezri King</p>
    `;
});