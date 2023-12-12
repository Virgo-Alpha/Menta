const Datastore = require('nedb');

class Student {
  constructor(studentId, firstName, lastName, dateOfBirth, gender, studentEmail, enrollmentDate, degreeProgram, goals = [], sessions = []) {
    this.studentId = studentId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.dateOfBirth = dateOfBirth;
    this.gender = gender;
    this.studentEmail = studentEmail;
    this.enrollmentDate = enrollmentDate;
    this.degreeProgram = degreeProgram;
    this.goals = goals;
    this.sessions = sessions;
    this.Age = new Date().getFullYear() - new Date(dateOfBirth).getFullYear();
  }

  // Static methods for data access

  // Create a new student record
  static create(student, callback) {
    // Insert the student record into the database

    //calculate Age
    const dob = new Date(student.dateOfBirth);
    const currentYear = new Date().getFullYear();
    const Age = currentYear - dob.getFullYear();

    student.Age = Age;

    studentDB.insert(student, (err, newStudent) => {
      if (err) {
        callback(err);
      } else {
        callback(null, newStudent);
      }
    });
  }

  // delete all students
  static deleteAll(callback) {
    // Remove all student records from the database
    studentDB.remove({}, { multi: true }, (err, numRemoved) => {
      if (err) {
        callback(err);
      } else {
        callback(null, numRemoved);
      }
    });
  }

  // search students by firstName, lastName and degreeProgram array
  static searchStudents(searchCriteria, callback) {
    // Retrieve student records from the database
    studentDB.find({ $or: [{ firstName: searchCriteria }, { lastName: searchCriteria }, { degreeProgram: searchCriteria }] }, (err, students) => {
      if (err) {
        callback(err);
      } else {
        callback(null, students);
      }
    });
  }

  // Find a student by their ID
  static findById(studentId, callback) {
    // Retrieve the student record from the database
    studentDB.findOne({ studentId }, (err, student) => {
      if (err) {
        callback(err);
      } else {
        callback(null, student);
      }
    });
  }

  // Update a student's record
  static update(studentId, updatedStudent, callback) {
    // Update the student record in the database
    studentDB.update({ studentId }, { $set: updatedStudent }, {}, (err, numReplaced) => {
      if (err) {
        callback(err);
      } else {
        callback(null, numReplaced);
      }
    });
  }

  // Delete a student's record by their ID
  static delete(studentId, callback) {
    // Remove the student record from the database
    studentDB.remove({ studentId }, {}, (err, numRemoved) => {
      if (err) {
        callback(err);
      } else {
        callback(null, numRemoved);
      }
    });
  }

  // Retrieve all students
  static findAll(callback) {
    // Retrieve all student records from the database
    studentDB.find({}, (err, students) => {
      if (err) {
        callback(err);
      } else {
        //console.log(students);
        callback(null, students);
      }
    });
  }
}

// Configure the NeDB database for students
const studentDB = new Datastore({ filename: './data/students.db', autoload: true });

module.exports = Student;
