### GET /api/transactions
Gets json of all transactions.
Request body: None
Success response — 200 OK:
    [{"id":1,"name":"Tutor Salary","accountId":1,"amount":500,"date":"2026-05-15","type":"Income","category":["Salary"],"method":"Bank Transfer"},{"id":2,"name":"Grocery Shopping","accountId":3,"amount":50,"date":"2026-05-16","type":"Expense","category":["Food","Groceries"],"method":"Cash"}]
Error response — 404 Not Found:
    { "error":"Validation failed", "fields": {"message":"Transactions do not exist or could not be found"}}

### GET /api/transactions/:id
Gets a single transaction by its identification number.
Request body (JSON):
    id          integer         required    ID of transaction (must exist and must be > 0)
Success response — 200 OK:
    {"id":2,"name":"Grocery Shopping","accountId":3,"amount":50,"date":"2026-05-16","type":"Expense","category":["Food","Groceries"],"method":"Cash"}
Error response — 400 Bad Request:
    { "error": "Validation failed", "fields": { "id": "ID must be a positive number"} }


### POST /api/transactions/
Posts json of one transaction to save it to the server.
Request body (JSON):
    name        string          required    Name/title of transaction
    accountId   integer         required    ID of account this transaction belongs to (must be greater than 0 and must exist)
    amount      decimal         required    Amount of money (must be greater than 0)
    date        date            required    Date transaction occured
    type        string          required    Income or Expense
    category    string array    required    Purpose of transaction (ex: gas, education, groceries, salary)
    method      string          required    Payment method
Success response — 200 OK:
    {"id":2,"name":"Grocery Shopping","accountId":3,"amount":50,"date":"2026-05-16","type":"Expense","category":["Food","Groceries"],"method":"Cash"}
Error response — 400 Bad Request: (TODO Add error response here and to api)
    { "error": "Validation failed", "fields": { "name": "Name is required", "accountId":"Account ID must be greater than 0", "amount":"Amount must be a positive number", "date":"Date must be of type Date", "type":"Type must be Income or Expense","category":"Category must be of type Array","method":"Payment Method must be of type String" } }


### PATCH /api/transactions/:id
Gets json of one transaction based on transaction id.
Request body (JSON):
    id          integer         required    ID of transaction (must exist and must be > 0)
    name        string          required    Name/title of transaction
    accountId   integer         required    ID of account this transaction belongs to
    amount      decimal         required    Amount of money (must be greater than 0)
    date        date            required    Date transaction occured
    type        string          required    Income or Expense
    category    string array    required    Purpose of transaction (ex: gas, education, groceries, salary)
    method      string          required    Payment method
Success response — 200 OK:
    {"id":2,"name":"Grocery Shopping","accountId":3,"amount":50,"date":"2026-05-16","type":"Expense","category":["Food","Groceries"],"method":"Cash"}
Error response — 404 Bad Request:
    { "error": "Validation failed", "fields": { "id": "Transaction id does not exist" }
}


### DELETE /api/transactions/:id
Deletes one transaction based on transaction id.
Request body (JSON):
    id          integer         required    ID of transaction (must exist and must be > 0)
Success response — 200 OK:
    {"id":2,"name":"Grocery Shopping","accountId":3,"amount":50,"date":"2026-05-16","type":"Expense","category":["Food","Groceries"],"method":"Cash"}
Error response — 400 Bad Request:
    { "error": "Validation failed", "fields": { "id": "ID must be a positive number"} }