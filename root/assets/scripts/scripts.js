"use strict";

header = document.getElementsByTagName('header')[0];
footer = document.getElementsByTagName('footer')[0];

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
        set meta tags
    */
    this.document.head.innerHTML += `
        <link rel="stylesheet" href="assets/css/styles.css">
    `;

    // /* add class to body */
    // document.body.classList.add('custom-style');

    // /* add style to head */
    // var style = document.createElement('style');
    // style.innerHTML = `
    //     .custom-style {
    //         background-color: #f0f0f0;
    //         color: #333;
    //         padding: 10px;
    //         border-radius: 5px;
    //     }
    // `;
    // document.head.appendChild(style); */
});