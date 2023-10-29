const Student = require('../models/Student');

const studentController = {
  // Create a new student
  create: (req, res) => {
    const { name, studentId, major, enrollmentYear, gradYear, gender, yearOfBirth, studentEmail } = req.body;

    const newStudent = new Student(name, studentId, major, enrollmentYear, gradYear, gender, yearOfBirth, studentEmail);

    Student.create(newStudent, (err, student) => {
      if (err) {
        res.status(500).json({ error: 'Could not create a new student.' });
      } else {
        res.json(student);
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
    const studentId = req.params.id;
    const updatedStudent = req.body;

    Student.update(studentId, updatedStudent, (err, numReplaced) => {
      if (err) {
        res.status(500).json({ error: 'Could not update the student.' });
      } else {
        res.json({ message: 'Student updated successfully', numReplaced });
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
};

module.exports = studentController;
