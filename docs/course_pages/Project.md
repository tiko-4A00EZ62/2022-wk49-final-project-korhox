# Backend Development - Project

Louis Botha, `louis.botha@tuni.fi`

![EXPENSE TRACKER Archives](https://www.thebudgetmom.com/wp-content/uploads/2018/08/How-to-Create-a-Visual-Method-for-Tracking-Your-Expenses-FB-Link-1024x536.png)

## 📖 Topic

**General Project**
Most of us want to know where our money goes. You now have the chance to create a solution to that question. Create an application for tracking your personal expenses.

**OR**

**Fantasy Project**
Like fantasy pizza, you can decide your own final project concept.
The idea must be approved by the teacher (DM the idea in ::slack:Slack).

> :attention: Either way, this project can become a very good portfolio project to show recruiters.

## 📃 Requirements

- [x] A [KickAss](https://meakaakka.medium.com/a-beginners-guide-to-writing-a-kickass-readme-7ac01da88ab3) README for the project
  - Minimum content:
    - [x] Backend server address and implemented endpoints
    - [x] Frontend server address (if done)
    - [x] Instructions for running the application locally
      - [x] Node instructions
      - [x] SQL statements for creating and adding default data
    - [ ] **Project self evaluation, use project evaluation criteria (see *Evaluation* section)**
- [x] A REST API for creating and maintaining a list of expenses written with Node, Express and MySQL.
- [ ] **Integration tests (SuperTest) for the main API endpoints.**
- [x] OpenAPI/Swagger documentation for API.
- [x] `.rest` file for testing each of the API endpoints.
  - [x] localhost.rest
  - [ ] **server.rest**
- The following endpoints should be implemented by the Backend REST API:
  - [x] A user can retrieve a list of expenses (GET)
  - [x] A user can add an expense (POST)
  - [x] A user can delete an expense (DELETE)
  - [x] A user can update an expense (PUT)
  - [x] A user can retrieve the expenses for a specific month (GET /month)
  - [x] A user can retrieve the expenses sorted by some criteria, e.g. (GET &shop=Prisma)
    - [x] date
    - [x] amount
    - [x] category
    - [x] shop
  - [x] (🏆) A user can see the total amount of the retrieved list of expenses
    💡 Hint: You might need to change the returned json:

    ```json
      {
      "data": [{},{},{}] //array of expenses
      "total": 123,45   //sum of the expenses returned
      }
    ```

- [x] (🏆) A simple React (Pug/js) frontend for viewing an expense list and adding new expenses.

> :attention: The backend is the focus of the course and where you should place your effort.
> The frontend is basically to receive bonus credit and to have a portfolio application ready.
> API functionality trumps frontend beauty.

## 🧾 Expense details

An expense should have at least the following fields:

- [x] date
- [x] amount
- [x] shop
- [x] category
- [x] + description

You may add more fields as you see fit and wish.

## 📋 Evaluation

The project will be evaluated on:

- Solution Design
- Execution
- Requirements satisfaction
- Coding Style
- Documentation

Bonus credit can be given for:

- [x] a frontend implementation
- [x] a backend implementation that extended the requirements with a good feature
- [x] particularly well written code or using the programming language well

[Detailed evaluation criteria for project.](https://www.dropbox.com/scl/fi/qhb4lh0wwbxvimwv791wa/Backend-Project-Grading.paper?dl=0&rlkey=cc02glhc6nxl9dzsblsh7q1uu)

## 📝 Plagiarism

A student can discuss the work on a general level with other students, but copying even one line of code from another student is considered fraudulent activity. Returned work is run through a plagiarism checking application that looks for similarities in work. Naming the variables slightly differently or changing the indentation will not prevent the plagiarism tool from finding similarities. In addition to the tool, the similarity of the works is evaluated visually by the evaluator.

Plagiarism of the work leads to the rejection of the project work.

See [intranet](https://intra.tuni.fi/handbook?page=2255).
