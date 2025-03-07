\c employees

INSERT INTO departments (name) VALUES ('Finance'),('Accounting'),('Marketing');
INSERT INTO role (title, salary, department_id) VALUES ('Head Manager', 80000, 1), ('Employee', 50000, 2), ('Mail', 45000, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Bob', 'Wilson', 1, null), ('Skylar', 'Octavia', 2, 1);
