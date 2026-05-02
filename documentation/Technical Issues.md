Project Created: 4/10/2026 

4/10/2026 9:34PM
Having issues with getting the index.html to redirect to the dashboard.html page in VSCode Liveserver. Left comment in TODO for it and will continue developing running live server from dashboard.html for now because that works perfectly.

4/10/2026 9:38PM
Solved index redirect issue.
There was an extrenuous page/dashboard.html, for some reason, outside the root folder. Removing that resulted in the redirect giving a proper error message about not being able to reach pages.html (I didn't copy it, sorry boutcha).
Adding the dot before the pages link solved that error.

4/22/2026 12:23PM
Began creating XAMPP database and connecting to it. Following these instructions: https://github.com/Omar-Sa6ry/XMPP-nodejs/blob/main/README.md
No issues yet, but I can't help but anticipate. Plus, I will probably need the reference for the README setup instructions.


(Neglected writing up many, many technical issues and learnings)


5/2/2026 4:13PM
When getting a transaction by id in api-router + the function callbacks, the id had a ':' infront of it. This is because I went to my localhost url @ /api/transactions/:6 . I did that because examples did, but when escaping the ':' with adding another infront, i.e. '::' (did the escaping in /routes/api-router.js), didn't work, I just removed the : from the localhost url. i.e. @ /api/transactions/6 instead. That's working. I hope I don't need the colon there, but if I do, I can manually escape it pretty easily w/ a google search, no brain power needed.