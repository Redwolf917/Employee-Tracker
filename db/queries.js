import { query } from './db.js';

export const getDepartments = async () => {
  const res = await query('SELECT * FROM department');
  return res.rows;
};

export const getRoles = async () => {
  const res = await query(`
    SELECT role.id, role.title, role.salary, department.name AS department
    FROM role
    JOIN department ON role.department_id = department.id
  `);
  return res.rows;
};

export const getEmployees = async () => {
  const res = await query(`
    SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, manager.first_name AS manager_first_name, manager.last_name AS manager_last_name
    FROM employee
    JOIN role ON employee.role_id = role.id
    JOIN department ON role.department_id = department.id
    LEFT JOIN employee manager ON employee.manager_id = manager.id
  `);
  return res.rows;
};

export const addDepartment = async (name) => {
  await query('INSERT INTO department (name) VALUES ($1)', [name]);
};

export const addRole = async (title, salary, departmentId) => {
  await query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)', [title, salary, departmentId]);
};

export const addEmployee = async (firstName, lastName, roleId, managerId) => {
  await query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', [firstName, lastName, roleId, managerId]);
};

export const updateEmployeeRole = async (employeeId, roleId) => {
  await query('UPDATE employee SET role_id = $1 WHERE id = $2', [roleId, employeeId]);
};
