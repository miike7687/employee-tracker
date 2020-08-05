// Dependencies
const Employee = require("./lib/employee.js");
const Department = require("./lib/department.js");
const Role = require("./lib/role.js");
var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "ya777nks",
  database: "employee_trackerDB",
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  //   viewEmployees();
  userPrompt();
});

// console.log("Inserting a new role...\n");

function userPrompt(response) {
  return inquirer
    .prompt([
      {
        type: "list",
        message: "What would you like to do?",
        choices: [
          "View All Employees",
          "View All Employees by Department",
          "View All Employees by Manager",
          "View All Employees by Role",
          "Add Employee",
          "Remove Employee",
          "Add Department",
          "Remove Department",
          "Add Role",
          "Remove Role",
          "View All Roles",
          "Update Employee Roles",
          "Update Employee Managers",
        ],
        name: "choice",
      },
    ])
    .then(function (reply) {
      if (reply.choice === "Add Employee") {
        inquirer
          .prompt([
            {
              type: "input",
              message: "What is the employee's first name?",
              name: "firstName",
            },
            {
              type: "input",
              message: "What the employee's last name?",
              name: "lastName",
            },
            {
              type: "input",
              message: "What is the employee's role ID?",
              name: "role",
            },
            {
              type: "input",
              message: "What is the employee's manager's ID?",
              name: "managerId",
            },
          ])
          .then(function (addEmployeeReply) {
            var newEmployee = new Employee(
              addEmployeeReply.firstName,
              addEmployeeReply.lastName,
              addEmployeeReply.role,
              addEmployeeReply.managerId
            );
            console.log(newEmployee);
            // employeeId = employeeId++;
            addEmployee(newEmployee);
            // newTeamMember();
          });
      } else if (reply.choice === "Add Role") {
        inquirer
          .prompt([
            {
              type: "input",
              message: "What is the title of the role?",
              name: "title",
            },
            {
              type: "input",
              message: "What is this role's salary?",
              name: "salary",
            },
            {
              type: "input",
              message: "What's the department ID of this role?'",
              name: "departmentId",
            },
          ])
          .then(function (addRoleReply) {
            var newRole = new Role(
              addRoleReply.title,
              addRoleReply.salary,
              addRoleReply.departmentId
            );
            console.log(newRole);
            // employeeId = employeeId++;
            addRole(newRole);
          });
      } else if (reply.choice === "Add Department") {
        inquirer
          .prompt([
            {
              type: "input",
              message: "What is the name of this new department?",
              name: "name",
            },
          ])
          .then(function (departmentReply) {
            var newDepartment = new Department(departmentReply.name);
            console.log(newDepartment);
            addDepartment(newDepartment);
          });
      } else if (reply.choice === "View All Employees") {
        viewEmployees();
        userPrompt();
      } else if (reply.choice === "View All Roles") {
        viewRoles();
        userPrompt();
      } else if (reply.choice === "Remove Employee") {
        deleteEmployee();
      } else if (reply.choice === "Remove Role") {
        deleteRole();
      } else if (reply.choice === "Remove Department") {
        deleteDepartment();
      }
    })
    .catch(function (err) {
      console.log(err);
    });
}
function addEmployee(employee) {
  console.log("Adding a new employee...\n");
  var query = connection.query(
    "INSERT INTO employee SET ?",
    {
      first_name: employee.firstName,
      last_name: employee.lastName,
      role_id: employee.role,
      manager_id: employee.managerId,
    },
    function (err, res) {
      if (err) throw err;
      console.log(res.affectedRows + " employee added \n");
      //   viewEmployees();
      userPrompt();
    }
  );
}

function addRole(role) {
  console.log("Adding a new role...\n");
  var query = connection.query(
    "INSERT INTO role SET ?",
    {
      title: role.title,
      salary: role.salary,
      department_id: role.departmentId,
    },
    function (err, res) {
      if (err) throw err;
      console.log(res.affectedRows + " role added \n");
      //   viewRoles();
      userPrompt();
    }
  );
}

function addDepartment(department) {
  console.log("Adding a new role...\n");
  var query = connection.query(
    "INSERT INTO department SET ?",
    {
      department_name: department.name,
    },
    function (err, res) {
      if (err) throw err;
      console.log(res.affectedRows + " department added \n");
      //   viewRoles();
      userPrompt();
    }
  );
}

function viewEmployees() {
  console.log("Employees");
  connection.query("SELECT * FROM employee", function (err, res) {
    if (err) throw err;
    console.table(res);
  });
}

function viewRoles() {
  console.log("Roles:");
  connection.query("SELECT * FROM role", function (err, res) {
    if (err) throw err;
    console.table(res);
  });
}

function deleteEmployee(employee) {
  let employeeArr = [];
  connection.query("SELECT * FROM employee", function (err, res) {
    for (var i = 0; i < res.length; i++) {
      employeeArr.push(res[i].first_name + " " + res[i].last_name);
    }
    console.log(employeeArr);
    inquirer
      .prompt([
        {
          type: "list",
          message: "Which employee do you want to remove?",
          choices: employeeArr,
          name: "remove",
        },
      ])
      .then(function (answer) {
        const split = answer.remove.split(" ");
        const firstName = split[0];
        // const lastName = split[1];
        connection.query(
          `DELETE FROM employee WHERE first_name=?`,
          [firstName],
          function (err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " employee deleted!\n");
          }
        );
      });
  });
}

function deleteRole(role) {
  let roleArr = [];
  connection.query("SELECT * FROM role", function (err, res) {
    for (var i = 0; i < res.length; i++) {
      roleArr.push(res[i].title);
    }
    console.log(roleArr);
    inquirer
      .prompt([
        {
          type: "list",
          message: "Which role do you want to remove?",
          choices: roleArr,
          name: "remove",
        },
      ])
      .then(function (answer) {
        const roleRemoved = answer.remove;
        console.log(roleRemoved);
        // const lastName = split[1];
        connection.query(
          `DELETE FROM role WHERE title=?`,
          [roleRemoved],
          function (err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " role deleted!\n");
          }
        );
      });
  });
}

function deleteDepartment(department) {
  let departmentArr = [];
  connection.query("SELECT * FROM department", function (err, res) {
    for (var i = 0; i < res.length; i++) {
      departmentArr.push(res[i].department_name);
    }
    console.log(departmentArr);
    inquirer
      .prompt([
        {
          type: "list",
          message: "Which role do you want to remove?",
          choices: departmentArr,
          name: "remove",
        },
      ])
      .then(function (answer) {
        const departmentRemoved = answer.remove;
        // console.log(departmentRemoved);
        // const lastName = split[1];
        connection.query(
          `DELETE FROM department WHERE department_name=?`,
          [departmentRemoved],
          function (err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " department deleted!\n");
          }
        );
      });
  });
}
