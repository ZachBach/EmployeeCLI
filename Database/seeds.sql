USE employee_DB;

INSERT INTO department (name) VALUES ("Sales");
INSERT INTO department (name) VALUES ("Software Engineering");
INSERT INTO department (name) VALUES ("Finance");
INSERT INTO department (name) VALUES ("Human Resources");

INSERT INTO roles (title, salary,  department_id) VALUES("Sales Lead", 92000, 1);
INSERT INTO roles (title, salary,  department_id) VALUES("Software Engineer", 115000, 2);
INSERT INTO roles (title, salary,  department_id) VALUES("Lead Engineer", 175000, 2);
INSERT INTO roles (title, salary,  department_id) VALUES("Accountant", 125000, 3);
INSERT INTO roles (title, salary,  department_id) VALUES("Analyst", 75000, 4);

INSERT INTO employee (first_name, last_name, roles_id, manager_id) VALUES ("Harvey", "Dent", 1, 3);
INSERT INTO employee (first_name, last_name, roles_id, manager_id) VALUES ("Bruce", "Wayne", 2, 1);
INSERT INTO employee (first_name, last_name, roles_id, manager_id) VALUES ("Naruto", "Uzamaki", 3, NULL);
INSERT INTO employee (first_name, last_name, roles_id, manager_id) VALUES ("James", "Brown", 4, 3);
INSERT INTO employee (first_name, last_name, roles_id, manager_id) VALUES ("Francine", "Medina", 5, NULL);
INSERT INTO employee (first_name, last_name, roles_id, manager_id) VALUES ("Sharon", "Bless", 2, NULL);
INSERT INTO employee (first_name, last_name, roles_id, manager_id) VALUES ("Zachary", "Binks", 4, 7);
INSERT INTO employee (first_name, last_name, roles_id, manager_id) VALUES ("Elvis", "Presely", 1, 2);
