class Role {
  //   // create a basic constructor including name, email and id
  constructor(title, salary, departmentId) {
    this.title = title;
    this.salary = salary;
    this.departmentId = departmentId;
  }
  getTitle() {
    return this.title;
  }
  getSalary() {
    return this.salary;
  }
  getDepartmentId() {
    return this.departmentId;
  }
}

module.exports = Role;
