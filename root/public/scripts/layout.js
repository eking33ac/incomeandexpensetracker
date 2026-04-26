"use strict";

/* Layout script now only adds functionality to nav hamburger btn */

// const header = document.querySelector('header');
// const footer = document.querySelector('footer');
const nav = document.querySelector('nav');
// const main = document.querySelector('main');


window.addEventListener('DOMContentLoaded', () => {
    // initPage();
    buildLayout();
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
    /* add event listener to hamburger button */
    const hamburgerBtn = document.getElementById("hamburger-btn");
    hamburgerBtn.addEventListener("click", () => {
        nav.classList.toggle("inactive");
    });
}