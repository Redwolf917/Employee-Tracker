import inquirer from 'inquirer';
import {
  getDepartments,
  getRoles,
  getEmployees,
  addDepartment as addDeptToDB,
  addRole,
  addEmployee as addEmployeeToDB,
  updateEmployeeRole
} from './db/queries.js';

const startApp = () => {
  inquirer.prompt({
    type: 'list',
    name: 'action',
    message: 'What would you like to do?',
    choices: [
      'View all departments',
      'View all roles',
      'View all employees',
      'Add a department',
      'Add a role',
      'Add an employee',
      'Update an employee role',
      'Exit'
    ]
  }).then((answer) => {
    switch (answer.action) {
      case 'View all departments':
        viewAllDepartments();
        break;
      case 'View all roles':
        viewAllRoles();
        break;
      case 'View all employees':
        viewAllEmployees();
        break;
      case 'Add a department':
        addDepartment();
        break;
      case 'Add a role':
        addRolePrompt();
        break;
      case 'Add an employee':
        addEmployee();
        break;
      case 'Update an employee role':
        updateEmployeeRolePrompt();
        break;
      case 'Exit':
        process.exit();
    }
  });
};

const viewAllDepartments = async () => {
  const departments = await getDepartments();
  console.table(departments);
  startApp();
};

const viewAllRoles = async () => {
  const roles = await getRoles();
  console.table(roles);
  startApp();
};

const viewAllEmployees = async () => {
  const employees = await getEmployees();
  console.table(employees);
  startApp();
};

const addDepartment = async () => {
  const answer = await inquirer.prompt({
    name: 'name',
    type: 'input',
    message: 'Enter the department name:'
  });
  await addDeptToDB(answer.name);
  console.log(`Department ${answer.name} added!`);
  startApp();
};

const addRolePrompt = async () => {
  const departments = await getDepartments();
  const departmentChoices = departments.map(department => ({
    name: department.name,
    value: department.id
  }));

  const answers = await inquirer.prompt([
    { name: 'title', type: 'input', message: 'Enter the role title:' },
    { name: 'salary', type: 'input', message: 'Enter the role salary:' },
    {
      name: 'departmentId',
      type: 'list',
      message: 'Select the department:',
      choices: departmentChoices
    }
  ]);

  await addRole(answers.title, answers.salary, answers.departmentId);
  console.log(`Role ${answers.title} added!`);
  startApp();
};

const addEmployee = async () => {
  const roles = await getRoles();
  const roleChoices = roles.map(role => ({
    name: role.title,
    value: role.id
  }));

  const employees = await getEmployees();
  const managerChoices = employees.map(employee => ({
    name: `${employee.first_name} ${employee.last_name}`,
    value: employee.id
  }));
  managerChoices.unshift({ name: 'None', value: null });

  const answers = await inquirer.prompt([
    { name: 'firstName', type: 'input', message: 'Enter the employee\'s first name:' },
    { name: 'lastName', type: 'input', message: 'Enter the employee\'s last name:' },
    {
      name: 'roleId',
      type: 'list',
      message: 'Select the employee\'s role:',
      choices: roleChoices
    },
    {
      name: 'managerId',
      type: 'list',
      message: 'Select the employee\'s manager:',
      choices: managerChoices
    }
  ]);

  await addEmployeeToDB(answers.firstName, answers.lastName, answers.roleId, answers.managerId);
  console.log(`Employee ${answers.firstName} ${answers.lastName} added!`);
  startApp();
};

const updateEmployeeRolePrompt = async () => {
  const employees = await getEmployees();
  const employeeChoices = employees.map(employee => ({
    name: `${employee.first_name} ${employee.last_name}`,
    value: employee.id
  }));

  const roles = await getRoles();
  const roleChoices = roles.map(role => ({
    name: role.title,
    value: role.id
  }));

  const answers = await inquirer.prompt([
    {
      name: 'employeeId',
      type: 'list',
      message: 'Select the employee to update:',
      choices: employeeChoices
    },
    {
      name: 'roleId',
      type: 'list',
      message: 'Select the new role:',
      choices: roleChoices
    }
  ]);

  await updateEmployeeRole(answers.employeeId, answers.roleId);
  console.log('Employee role updated!');
  startApp();
};

startApp();
