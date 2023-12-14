const Student = require('../models/Student');

const studentController = {
  // Create a new student
  create: (req, res) => {
    const { studentId, firstName, lastName, dateOfBirth, gender, studentEmail, enrollmentDate, degreeProgram } = req.body;

    const newStudent = new Student(studentId, firstName, lastName, dateOfBirth, gender, studentEmail, enrollmentDate, degreeProgram);

    Student.create(newStudent, (err, student) => {
      if (err) {
        res.status(500).json({ error: 'Could not create a new student.' });
      } else {
        // render the student details page and pass student data to Mustache template
        res.render('admin_views/submittedStudent', {
          student_id: student._id,
          studentId: student.studentId,
          firstName: student.firstName,
          lastName: student.lastName,
          Age: student.Age,
          gender: student.gender,
          studentEmail: student.studentEmail,
          enrollmentDate: student.enrollmentDate,
          degreeProgram: student.degreeProgram,
        });
      }
    });
  },

  // Find all students
  findAll: (req, res) => {
    Student.findAll((err, students) => {
      if (err) {
        res.status(500).json({ error: 'Could not find students.' });
      } else {
        res.json(students);
      }
    });
  },

  // Retrieve a student by ID
  findById: (req, res) => {
    const studentId = req.params.id;

    Student.findById(studentId, (err, student) => {
      if (err) {
        res.status(500).json({ error: 'Could not find the student.' });
      } else {
        if (student) {
          res.json(student);
        } else {
          res.status(404).json({ error: 'Student not found.' });
        }
      }
    });
  },

  // Update a student's information
  update: (req, res) => {
    const student_id = req.params.id;
    const { studentId, firstName, lastName, dateOfBirth, gender, studentEmail, enrollmentDate, degreeProgram } = req.body;

    // Check for empty values before updating
    const updateData = {};
    if (studentId) updateData.studentId = studentId;
    if (firstName) updateData.firstName = firstName;
    if (lastName) updateData.lastName = lastName;
    if (dateOfBirth) updateData.dateOfBirth = dateOfBirth;
    if (gender) updateData.gender = gender;
    if (studentEmail) updateData.studentEmail = studentEmail;
    if (enrollmentDate) updateData.enrollmentDate = enrollmentDate;
    if (degreeProgram) updateData.degreeProgram = degreeProgram;

    Student.update(student_id, updateData, (err, updatedStudent) => {
      if (err) {
        res.status(500).json({ error: 'Could not update the student.' });
      } else {
        // render the updated student details page
        res.render('admin_views/updatedStudent', {
          student_id: updatedStudent._id,
          studentId: updatedStudent.studentId,
          firstName: updatedStudent.firstName,
          lastName: updatedStudent.lastName,
          Age: updatedStudent.Age,
          gender: updatedStudent.gender,
          studentEmail: updatedStudent.studentEmail,
          enrollmentDate: updatedStudent.enrollmentDate,
          degreeProgram: updatedStudent.degreeProgram,
        });
      }
    });
  },

  // Delete a student by ID
  delete: (req, res) => {
    const studentId = req.params.id;

    Student.delete(studentId, (err, numRemoved) => {
      if (err) {
        res.status(500).json({ error: 'Could not delete the student.' });
      } else {
        res.json({ message: 'Student deleted successfully', numRemoved });
      }
    });
  },

  // render student_oppotunity
  renderStudentOpportunity: (req, res) => {
    res.render('student_views/student_opportunity');
  },

  // render student profile
  renderStudentProfile: (req, res) => {
    res.render('student_views/student_profile');
  },

  // render student settings
  renderStudentSettings: (req, res) => {
    res.render('student_views/student_settings');
  },

  // render student report
  renderStudentReport: (req, res) => {
    res.render('student_views/student_report');
  },

};

module.exports = studentController;
