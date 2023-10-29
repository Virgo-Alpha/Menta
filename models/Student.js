const Datastore = require('nedb');

class Student {
  constructor(name, studentId, major, enrollmentYear, gradYear, gender, yearOfBirth, studentEmail) {
    this.name = name;
    this.studentId = studentId;
    this.major = major;
    this.enrollmentYear = enrollmentYear;
    this.gradYear = gradYear;
    this.gender = gender;
    this.yearOfBirth = yearOfBirth;
    this.studentEmail = studentEmail;
  }

  // Static methods for data access

  // Create a new student record
  static create(student, callback) {
    // Insert the student record into the database
    studentDB.insert(student, (err, newStudent) => {
      if (err) {
        callback(err);
      } else {
        callback(null, newStudent);
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
}

// Configure the NeDB database for students
const studentDB = new Datastore({ filename: './data/students.db', autoload: true });

module.exports = Student;
