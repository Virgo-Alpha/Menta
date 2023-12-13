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
        return newStudent;
      }
    });
  }

  // search students by firstName, lastName and degreeProgram array
  static searchStudents(firstName, lastName, degreeProgramArray, callback) {
    const query = {
      firstName: { $regex: new RegExp(firstName, 'i') },
      lastName: { $regex: new RegExp(lastName, 'i') },
      degreeProgram: { $in: degreeProgramArray}
    }
  
    studentDB.find(query, (err, students) => {
      if (err) {
        callback(err);
      } else {
        callback(null, students);
      }
    });
  }  

  // Find a student by their ID
  static findById(student_id, callback) {
    // Retrieve the student record from the database
    studentDB.findOne({ _id: student_id }, (err, student) => {
      if (err) {
        callback(err);
      } else {
        callback(null, student);
      }
    });
  }

  // find by studentId
  static findByStudentId(studentId, callback) {
    // Retrieve the student record from the database
    studentDB.findOne({ studentId: studentId }, (err, student) => {
      if (err) {
        callback(err);
      } else {
        callback(null, student);
      }
    });
  }

  // Update a student's record
  static update(studentId, updateData, callback) {
    // Update the student record in the database
    studentDB.update({ _id: studentId }, { $set: updateData }, {}, (err, numReplaced) => {
      if (err) {
        callback(err);
      } else {
        studentDB.findOne({ _id: studentId }, (err, updatedStudent) => {
          if (err) {
            callback(err);
          } else {
            callback(null, updatedStudent); // Pass the updated student to the callback
          }
        });
      }
    });
  }

  // update sessions
  static updateSessions(studentId, sessionData, callback) {
    Student.findByStudentId(studentId, (err, student) => {
      if (err || !student) {
        console.error('Error finding student:', err);
        // Handle error: student not found
        return;
      }

      // Assuming 'sessions' is an array in the Student model
    student.sessions.push(sessionData); // Add session data to the student's sessions array
      // Session added successfully
      console.log('Session added to student:', student);

      // Update the student record in the database
      studentDB.update({ studentId: studentId }, { $set: student }, {}, (err, numReplaced) => {
        if (err) {
          callback(err);
        } else {
          studentDB.findOne({ _id: studentId }, (err, updatedStudent) => {
            if (err) {
              callback(err);
            } else {
              callback(null, updatedStudent); // Pass the updated student to the callback
            }
          });
        }
      });
      
      callback(null, student);
    });
}

  // Delete a student's record by their ID
  static delete(studentId, callback) {
    // Remove the student record from the database
    studentDB.remove({ _id: studentId }, {}, (err, numRemoved) => {
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
        callback(null, students);
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
}

// Configure the NeDB database for students
const studentDB = new Datastore({ filename: './data/students.db', autoload: true });

// Clear out the database
studentDB.remove({}, { multi: true }, function (err, numRemoved) {
  console.log('Removed', numRemoved, 'students');
});

module.exports = Student;
