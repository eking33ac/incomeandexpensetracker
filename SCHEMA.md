## Entity-Relationships

The Transaction table represents any instance money left or entered an account and all the coresponding details such as amount, date, and payment method. It is related to the Accounts table on the account_id. A transaction can have one and only one account associated with it, and that account is where the transaction amount left from or went to.

The Account table represents a place the user has stored USD currency in the real world. It could be a savings account, checkings, their wallet, &c. It includes a base balance to be updated on the front end based on transaction data. An account can have 0 or many transactions associated with it.

## Column definitions:

For every table: column name, data type, constraints (NOT NULL, UNIQUE, DEFAULT, CHECK), and whether it is a primary key or foreign key.

** Transaction **
    id              INT AUTO_INCREMENT      NOT NULL            Primary
    name            VARCHAR(255)            NOT NULL DEFAULT
    amount          DECIMAL(10, 2)          NOT NULL UNSIGNED
    date            DATE                    NOT NULL
    type            VARCHAR(7)              NOT NULL CHECK
    account_id      INTEGER                 NOT NULL            Foreign
    category        VARCHAR(20)             NOT NULL
    payment_method  VARCHAR(20)             NOT NULL

** Account **
    id              INT AUTO_INCREMENT  UNIQUE NOT NULL     PRIMARY
    name            VARCHAR (50)        NOT NULL
    base_balance    INTEGER (10,2)      NOT NULL
    display_color   VARCHAR (6)         NOT NULL CHECK

## Normalization notes:

Unlike the current functional implementation made with a file datastore, this schema presumes category is individual.

Account display color does not necessarily depend on account, but for simplicity, since there are so few fields, it is included rather than stored in a separate "AccountColor" table.