class Employee {
  constructor(name, id, email) {
    this.title = "Employee";
    this.name = name;
    this.id = id;
    this.email = email;
  }

  // title will return string "Employee"
  getRole() {
    return this.title;
  }

  getName() {
    return this.name;
  }

  getId() {
    return this.id;
  }

  getEmail() {
    return this.email;
  }
}

module.exports = Employee;
