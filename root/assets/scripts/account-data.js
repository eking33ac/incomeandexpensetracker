/* Instructions:
https://www.w3schools.com/JS/js_async_fetch.asp

Structure your data.json to closely match the shape your API will eventually return. If
your API will return { "recipes": [ ... ] }, mirror that envelope in your mock file now. It will
save you a refactor in Phase 3.


• Populate it with at least eight realistic records for your primary entity. Please do not use
placeholder names like "Test Item 1"; instead use realistic values that reflect your
application domain.
• Load the file using Javascript’s Fetch API (fetch('./data/data.json')) rather than hardcoding
arrays in your JavaScript. This prepares you for swapping in a real API call in Phase 3 with
minimal refactoring.

fetch('./data/data.json')
 .then(res => res.json())
 .then(data => renderList(data))
 .catch(err => console.error('Data load failed:', err));

*/