# Expense Tracker<img src="./src/public/img/logo.svg" width=300 align="right" />

This is the final project for the 2022 backend course. The project is a simple web application and REST API for tracking your expenses.

<details>
  <summary>Table of Contents</summary>

- [Expense Tracker](#expense-tracker)
  - [REST API](#rest-api)
  - [Development setup](#development-setup)
    - [Prerequisites](#prerequisites)
    - [Setup](#setup)
  - [Environment variables](#environment-variables)
  - [Front End](#front-end)
    - [Main JS file](#main-js-file)
  - [Production setup](#production-setup)

</details>

## REST API

[![Swagger Validator](https://validator.swagger.io/validator?url=https%3A%2F%2Fraw.githubusercontent.com%2Ftiko-4A00EZ62%2F2022-wk49-final-project-korhox%2Fmain%2Fswagger.yml)](https://validator.swagger.io/?url=https://raw.githubusercontent.com/tiko-4A00EZ62/2022-wk49-final-project-korhox/main/swagger.yml)

The REST API is made with [Express](https://expressjs.com/). The API is documented with [OpenAPI](https://swagger.io/specification/) v3.0.3.

The API is fully documented in the [swagger.yml](./swagger.yml) file. You can view the documentation in [Swagger Editor](https://editor.swagger.io/?url=https://raw.githubusercontent.com/tiko-4A00EZ62/2022-wk49-final-project-korhox/main/swagger.yml).

## Development setup

### Prerequisites

The project requires [Node.js](https://nodejs.org/en/) and [Bun](https://bun.sh) to be installed. You also need an SQL database. The project has been tested with [MariaDB](https://mariadb.org/).

### Setup

1. Clone the repository:

    ```bash
    git clone git@github.com:tiko-4A00EZ62/2022-wk49-final-project-korhox.git
    ```

1. Set up your SQLdatabase. You can use one of the two following methods:

    - A. Use the [docker-compose.yml](./docker-compose.yml) file:
      - The database password is the value of the `MYSQL_PASSWORD` [environment variable](#environment-variables).
      - Run the docker compose:

        ```bash
        docker-compose up -d db
        ```

      - The database will be available at `localhost:3306` with user `root`.
      - Note that the database is not persistent. If you want to persist the database, you need to add a volume to the `db` service in the `docker-compose.yml` file. Docker compose file is designed for development purposes only.
    - B. Use your own SQL database. The project has been tested with [MariaDB](https://mariadb.org/).
      - Seed the database of your choice with the [data/seed.sql](./data/seed.sql) file.
      - Provide the credentials via [environment variables](#environment-variables).
1. Install the dependencies:

    ```bash
    bun install
    ```

1. Run the development server:

    ```bash
    bun run dev
    ```

## Environment variables

The project has environment variables that need to be configured. The default values are in `.env.example`. You can create a `.env` file to override the default values.

```conf
# App Settings
APP_PORT=3000                   # The port the server listens to, defaults to 3000 if not set

# Database
MYSQL_HOST=localhost            # The host of the database, localhost if you are using docker or
                                # the database is on the same machine
MYSQL_DBUSERNAME=root           # root if you are using docker
MYSQL_PASSWORD=password         # The password of the database, defaults to password if not set
MYSQL_DATABASE=expense_tracker  # The name of the database, defaults to expense_tracker if not set

# Database Advanced
MYSQL_POOL_MIN=1                # The minimum number of connections in the connection pool
MYSQL_POOL_MAX=10               # The maximum number of connections in the connection pool
MYSQL_PORT=3306                 # The port of the database, defaults to 3306 if not set

```

## Front End

The front end is made with [Pug](https://pugjs.org/api/getting-started.html), [Bootstrap](https://getbootstrap.com/docs/5.1/getting-started/introduction/) and vanilla JS (+Moment.js, Sweet Alert 2, FontAwesome 6).

You can access the front end at the root of the server and it does not have other pages. (eg. `localhost:3000/`)

Front End files:

- [src/views/includes/head.pug](./src/views/includes/head.pug) - The head of the HTML document with the CSS and JS imports
- [src/views/home.pug](./src/views/home.pug) - The home page
- [src/public/js/main.js](./src/public/js/main.js) - The main front end JS file, contains the logic for the front end

The pug files are compiled to HTML files via Express, using view engine. The compiled files are not included in the repository.

### Main JS file

The main JS file contains the logic for the front end. The logic is separated into different functions. The functions are called on page interaction. The functions are:

- `refreshTable()` - Refreshes the table with the data from the API, using the settings from the page inputs (run on page load)
- `addExpense()` - Displays the add expense modal
- `insertExpense()` - Inserts the modal content to the database via the API
- `editExpense(id)` - Displays the edit expense modal
- `updateExpense(id)` - Updates the expense with the given id via the API
- `deleteExpense(id)` - Deletes the expense with the given id via the API
- `nextPage()` - Loads the next page of the table
- `previousPage()` - Loads the previous page of the table
- `startSearch()` - Shows the search inputs
- `startFilter()` - Shows the filter inputs
- `startAmount()` - Shows the amount inputs
- `startDate()` - Shows the date inputs
- `closeForm()` - Closes the search forms

## Production setup

Thid project is not meant to be run in production.
