const mysql = require('mysql');
const inquirer = require('inquirer');

var connection = mysql.createConnection({

    host: "localhost",
    port: 3306,
    user: "root",
    password: "10416",
    database: "employee_db"

  });

  
  connection.connect(function(err) {
    if (err) throw err;
    start();
  });

  function start() {
    inquirer
      .prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add a department",
          "Add a role",
          "Add an employee",
          "Update employee role",
          "Exit"
        ]
      })
    .then(function(answer) {
        switch (answer.action) {
            case "View all departments":
            viewDepartments();
            break;
            
            case "View all roles":
            viewRoles();
            break;

            case "View all employees":
            viewEmployees();
            break;

            case "Add a department":
            addDepartment();
            break;

            case "Add a role":
            addRole();
            break;

            case "Add an employee":
            addEmployee();
            break;

            case "Update employee role":
            updateRole();
            break;

            case "Exit":
            connection.end();
            break;
            
        }
    });
}


function viewDepartments() {
    var query = "SELECT * FROM department";
      connection.query(query, function(err, res) {
          console.table(`DEPARTMENTS:`)
        res.forEach(department => {
            console.table(`ID: ${department.id} | Name: ${department.name}`)
        })
        start();
        });
    };

function viewRoles() {
    var query = "SELECT * FROM roles";
        connection.query(query, function(err, res) {
            console.table(`ROLES:`)
        res.forEach(roles => {
            console.table(`ID: ${roles.id} | Title: ${roles.title} | Salary: ${roles.salary} | Department ID: ${roles.department_id}`);
        })
        start();
        });
    };

function viewEmployees() {
    var query = "SELECT * FROM employee";
        connection.query(query, function(err, res) {
            console.table(`EMPLOYEES:`)
        res.forEach(employee => {
            console.table(`ID: ${employee.id} | Name: ${employee.first_name} ${employee.last_name} | Role ID: ${employee.roles_id} | Manager ID: ${employee.manager_id}`);
        })
        start();
        });
    };

function addDepartment() {
    inquirer
        .prompt({
            name: "department",
            type: "input",
            message: "What is the name of the new department?",
          })
        .then(function(answer) {
        var query = "INSERT INTO department (name) VALUES ( ? )";
        connection.query(query, answer.department, function(err, res) {
            console.log(`You have added this department: ${(answer.department).toUpperCase()}.`)
        })
        viewDepartments();
        })
}

function addRole() {
    connection.query('SELECT * FROM department', function(err, res) {
        if (err) throw (err);
    inquirer
        .prompt([{
            name: "title",
            type: "input",
            message: "What is the title of the new role?",
          }, 
          {
            name: "salary",
            type: "input",
            message: "What is the salary of the new role?",
          },
          {
            name: "departmentName",
            type: "list",
            message: "Which department does this role fall under?",
            choices: function() {
                var choicesArray = [];
                res.forEach(res => {
                    choicesArray.push(
                        res.name
                    );
                })
                return choicesArray;
              }
          }
          ]) 

        .then(function(answer) {
        const department = answer.departmentName;
        connection.query('SELECT * FROM DEPARTMENT', function(err, res) {
        
            if (err) throw (err);
         let depIteration = res.filter(function(res) {
            return res.name == department;
        }
        )
        let id = depIteration[0].id;
       let query = "INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)";
       let values = [answer.title, parseInt(answer.salary), id]
       console.log(values);
        connection.query(query, values,
            function(err, res) {
            console.log(`You have added this role: ${(values[0]).toUpperCase()}.`)
        })
            viewRoles()
            })
        })
    })
}

function addEmployee() {
    connection.query('SELECT * FROM roles', function(err, result) {
        if (err) throw (err);
    inquirer
        .prompt([{
            name: "firstName",
            type: "input",
            message: "What is the employee's first name?",
          }, 
          {
            name: "lastName",
            type: "input",
            message: "What is the employee's last name?",
          },
          {
            name: "roleName",
            type: "list",
            message: "What role does the employee have?",
            choices: function() {
             rolesArray = [];
                result.forEach(result => {
                    rolesArray.push(
                        result.title
                    );
                })
                return rolesArray;
              }
          }
          ]) 

        .then(function(answer) {
        console.log(answer);
        const role = answer.roleName;
        connection.query('SELECT * FROM roles', function(err, res) {
            if (err) throw (err);
            let roleIteration = res.filter(function(res) {
                return res.title == role;
            })
        let roleId = roleIteration[0].id;
        connection.query("SELECT * FROM employee", function(err, res) {
                inquirer
                .prompt ([
                    {
                        name: "manager",
                        type: "list",
                        message: "Who is your manager?",
                        choices: function() {
                            managersArray = []
                            res.forEach(res => {
                                managersArray.push(
                                    res.last_name)
                                
                            })
                            return managersArray;
                        }
                    }
                ]).then(function(managerAnswer) {
                    const manager = managerAnswer.manager;
                connection.query('SELECT * FROM employee', function(err, res) {
                if (err) throw (err);
                let newMangers = res.filter(function(res) {
                return res.last_name == manager;
            })
            let managerId = newMangers[0].id;
                    console.log(managerAnswer);
                    let query = "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)";
                    let values = [answer.firstName, answer.lastName, roleId, managerId]
                    console.log(values);
                     connection.query(query, values,
                         function(err, res, fields) {
                         console.log(`You have added this employee: ${(values[0]).toUpperCase()}.`)
                        })
                        viewEmployees();
                        })
                     })
                })
            })
        })
})
}

function updateRole() {
    connection.query('SELECT * FROM employee', function(err, result) {
        if (err) throw (err);
    inquirer
        .prompt([
          {
            name: "employeeName",
            type: "list",
            message: "Which employee's role is changing?",
            choices: function() {
             employeeArray = [];
                result.forEach(result => {
                    employeeArray.push(
                        result.last_name
                    );
                })
                return employeeArray;
              }
          }
          ]) 
        .then(function(answer) {
        console.log(answer);
        const name = answer.employeeName;
   
        connection.query("SELECT * FROM role", function(err, res) {
                inquirer
                .prompt ([
                    {
                        name: "role",
                        type: "list",
                        message: "What is their new role?",
                        choices: function() {
                            rolesArray = [];
                            res.forEach(res => {
                                rolesArray.push(
                                    res.title)
                                
                            })
                            return rolesArray;
                        }
                    }
                ]).then(function(rolesAnswer) {
                    const role = rolesAnswer.role;
                    console.log(rolesAnswer.role);
                connection.query('SELECT * FROM role WHERE title = ?', [role], function(err, res) {
                if (err) throw (err);
                    let roleId = res[0].id;
                    let query = "UPDATE employee SET role_id ? WHERE last_name ?";
                    let values = [roleId, name]
                    console.log(values);
                     connection.query(query, values,
                         function(err, res) {
                         console.log(`You have updated ${name}'s role to ${role}.`)
                        })
                        viewEmployees();
                        })
                     })
                })
       })
})

}