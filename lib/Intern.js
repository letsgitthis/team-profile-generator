// TODO: Write code to define and export the Intern class.  HINT: This class should inherit from Employee.
const Employee = require('./Employee')

class Intern extends Employee{
    constructor(name, id, email, school) {
        super(name, id, email)
        this.school = school
        this.title = 'Intern'
        this.icon = '<i class="fas fa-user-graduate mr-2"></i>'
    }

    getSchool() {
        return this.school

    }

    getRole() {
        return this.title

    }//Overridden to return 'Intern
}


module.exports = Intern;