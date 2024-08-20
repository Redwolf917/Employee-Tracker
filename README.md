# Employee-Tracker

## Description

The Employee-Tracker is a command-line application built with Node.js, Inquirer, and PostgreSQL. It allows business owners to easily view and manage all of the departments, roles, and employees in their company. This application offers a user-friendly interface to interact with the company's employee database, enabling the organization and planning of business operations.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Database Schema](#database-schema)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [License](#license)
- [Contributing](#contributing)
- [Questions](#questions)

## Installation

To get the Employee Management System up and running, follow these steps:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Redwolf917/Employee-Tracker.git
   ```

2. **Navigate to the Project Directory**:
   ```bash
   cd Employee-Tracker
   ```

3. **Install Dependencies**:
   ```bash
   npm install
   ```

4. **Set Up PostgreSQL Database**:
   - Create a new PostgreSQL database:
     ```sql
     CREATE DATABASE company_db;
     ```
   - Use the `schema.sql` file to set up the database schema:
     ```bash
     psql -U postgres -d company_db -f sql/schema.sql
     ```
   - (Optional) Use the `seeds.sql` file to populate the database with initial data:
     ```bash
     psql -U postgres -d company_db -f sql/seeds.sql
     ```

5. **Configure Database Connection**:
   - Update the `db.js` file with your PostgreSQL connection details. Specifically, you need to add your own password and change the username if you aren't using the username "postgres".

## Usage

To run the application:

```bash
node index.js
```

Once started, you will be presented with a menu of options:

- View all departments
- View all roles
- View all employees
- Add a department
- Add a role
- Add an employee
- Update an employee role
- Exit

### Example Commands

- **View All Employees**: Displays a formatted table showing employee data, including employee IDs, first names, last names, job titles, departments, salaries, and managers.
- **Add a New Role**: Prompts the user for the role name, salary, and department before adding the role to the database.

## Database Schema

The database consists of three main tables:

- **Department**:
  - `id`: SERIAL PRIMARY KEY
  - `name`: VARCHAR(30) UNIQUE NOT NULL

- **Role**:
  - `id`: SERIAL PRIMARY KEY
  - `title`: VARCHAR(30) UNIQUE NOT NULL
  - `salary`: DECIMAL NOT

## Git Repo Links (SSH & HTTPS)
 - git@github.com:Redwolf917/Employee-Tracker.git
 - https://github.com/Redwolf917/Employee-Tracker.git