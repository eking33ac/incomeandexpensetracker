/* TODO: 
    Add header, footer, and nav, then convert them to imports and exports in separate files.

    Add sandwich toggle 3 lines stacked thing, then also adjust sandwich toggle for media query
*/

"use strict";

let header = document.getElementsByTagName('header')[0];
let footer = document.getElementsByTagName('footer')[0];
let nav = document.getElementsByTagName('nav')[0];
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

};



