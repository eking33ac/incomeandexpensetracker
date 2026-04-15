HELLO! This README is currently a template for the final README and will be updated through development until it is a proper README. It is currently not very useful.
I love you! K bye! <3

Project title and one-paragraph description:
- What the application does and who it is for.
-- This application will allow the user to input their income and expenses manually to keep track of their personal finances on their own computer.
-- Who is it for?

How to run it:
- Instructions for viewing the project locally. Since there is no build step, this should be
brief. Mention that a local server is required to avoid CORS issues with fetch() (use VS
Code Live Server or python -m http.server).

View inventory:
- A short list of every view in the application, what it shows, and how to reach it from the
home screen.

Known issues or limitations:
- Be honest about what is incomplete or broken. 
-- In mobile view
    - The navigation is visible when you first load in or switch pages, and the hamburger button needs to be pressed to actually view the page you navigated to.
    - On the transactions page, the table expands beyond the screen size
-- Transactions Table
    - Move Account Name to the beginning of the row and change to read "Account"
    - Currently, Transactions will show ALL transaction history no matter what, so if there were hundreds or thousands of records, they would ALL appear every time.
-- Account value is not currently adjusted based on transaction history, making it inaccurate.
-- Footer
    - Add github repo link to the footer
    - Specify it is a student project

Changes from Phase 1 wireframes:
- If any view differs significantly from your original wireframe, describe the change and
your reason for it.
-- There are changes in the order of table headers in the Transactions table largely because aesthetic fixes take time. Ideally, by the end of the project, they will match or otherwise be more intuitive.