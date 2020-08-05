class Employee {
  //   // create a basic constructor including name, email and id
  constructor(firstName, lastName, role, managerId) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.role = role;
    this.managerId = managerId;
  }
  getFirstName() {
    return this.firstName;
  }
  getLastName() {
    return this.LastName;
  }
  getRole() {
    return this.role;
  }
  getManagerId() {
    return this.managerId;
  }
}

module.exports = Employee;
