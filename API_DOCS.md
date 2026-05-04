### GET /api/transactions
Gets json of all transactions.
Request body: None (TODO Is this none?)
Success response — 200 OK:
    [{"id":1,"name":"Tutor Salary","accountId":1,"amount":500,"date":"2026-05-15","type":"Income","category":["Salary"],"method":"Bank Transfer"},{"id":2,"name":"Grocery Shopping","accountId":3,"amount":50,"date":"2026-05-16","type":"Expense","category":["Food","Groceries"],"method":"Cash"}]
Error response — 400 Bad Request: (TODO Add error response here and to api)
    { "error": "Validation failed", "fields": { "title": "Title is required" }
}



### POST /api/transactions/:id
Gets json of one transaction based on transaction id.
Request body (JSON):
    id  integer required id of transaction (must exist and must be > 0)
Success response — 200 OK:
    {"id":2,"name":"Grocery Shopping","accountId":3,"amount":50,"date":"2026-05-16","type":"Expense","category":["Food","Groceries"],"method":"Cash"}
Error response — 400 Bad Request: (TODO Add error response here and to api)
    { "error": "Validation failed", "fields": { "title": "Title is required" }
}


### POST /api/transactions/:id
Gets json of one transaction based on transaction id.
Request body (JSON):
    title string required Name of the recipe
    cuisine string required Cuisine type
    prep_time integer required Preparation time in minutes (must be > 0)
    servings integer optional Number of servings
Success response — 201 Created:
    { "id": 9, "title": "Shakshuka", "cuisine": "Middle Eastern", "prep_time":
20 }
Error response — 400 Bad Request:
    { "error": "Validation failed", "fields": { "title": "Title is required" }
}


### POST /api/transactions/:id
Gets json of one transaction based on transaction id.
Request body (JSON):
    title string required Name of the recipe
    cuisine string required Cuisine type
    prep_time integer required Preparation time in minutes (must be > 0)
    servings integer optional Number of servings
Success response — 201 Created:
    { "id": 9, "title": "Shakshuka", "cuisine": "Middle Eastern", "prep_time":
20 }
Error response — 400 Bad Request:
    { "error": "Validation failed", "fields": { "title": "Title is required" }
}