"use strict";

const header = document.querySelector('header');
const footer = document.querySelector('footer');
const nav = document.querySelector('nav');
// const main = document.querySelector('main');


window.addEventListener('DOMContentLoaded', () => {
    buildLayout();
    initPage();
});

/* Suggested by AI but idk what these non-existant init functions do yet */
function initPage() {
  const pageTitle = document.title;
  if (pageTitle === "Accounts") initAccountsPage();
  else if (pageTitle === "Transactions") initTransactionsPage();
  else if (pageTitle === "Dashboard") initDashboardPage();
}

// create common nav, footer, and make each page have it's title as the header
// ensure navigation hamburger works
function buildLayout() {
    const pageTitle = document.title;

    /* add header to document */
    header.innerHTML = `
        <h1>${pageTitle}</h1>
    `;

    /* add navigation to document */
    nav.innerHTML = `
        <button id="hamburger-btn">&#9776;</button>
        <a href="dashboard.html">Dashboard</a>
        <a href="transactions.html">Transactions</a>
	    <a href="accounts.html">Accounts</a>
    `;

    /* add event listener to hamburger button */
    const hamburgerBtn = document.getElementById("hamburger-btn");
    hamburgerBtn.addEventListener("click", () => {
        nav.classList.toggle("inactive");
    });

    /* add footer to document */
    footer.innerHTML += `
        <p>&copy; 2026 Income and Expense Tracker. All rights reserved.</p>
        <a href="https://github.com/eking33ac/incomeandexpensetracker">GitHub Repository</a>
    `;
}