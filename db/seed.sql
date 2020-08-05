USE employeeTracker_db;

INSERT INTO department (department_name)
VALUES ("Sales"),("HR"),("Maintenance");
INSERT INTO role (title, salary, department_id)
VALUES ("Cashier", 35000.00, 1),("Manager", 50000.00, 1),("Talent", 60000.00, 2),("Janitor", 20000.00, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES("Hermione","Granger", 2, null),("Luna","Lovegood", 2, null),("Master","Doby",1,2),("Lord", "Voldemort", 4,1),("Albus", "Dumbledore", 3, null);
-- SELECT employee.first_name, employee.last_name, role.title, role.salary, department.department_name
-- from employee
-- join role on employee.role_id = role.id
-- join department on role.department_id = department.id;
-- -- need to join employee.manager_id with their manager's name
select * from department;
select * from role;
select * from employee;
