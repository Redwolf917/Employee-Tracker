-- Insert initial departments
INSERT INTO department (name) VALUES 
('Engineering'),
('Human Resources'),
('Finance');

-- Insert initial roles
INSERT INTO role (title, salary, department_id) VALUES 
('Software Engineer', 80000, 1),
('HR Manager', 70000, 2),
('Financial Analyst', 75000, 3);

-- Insert initial employees
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES 
('John', 'Doe', 1, NULL),
('Jane', 'Smith', 2, NULL),
('Michael', 'Johnson', 3, NULL);
