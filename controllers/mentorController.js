const Mentor = require('../models/Mentor');

const mentorController = {
  // Create a new mentor
  create: (req, res) => {
    const { name, age, profession, industry, gradYear, gender } = req.body;
    const newMentor = new Mentor(name, age, profession, industry, gradYear, gender);

    Mentor.create(newMentor, (err, mentor) => {
      if (err) {
        res.status(500).json({ error: 'Could not create a new mentor.' });
      } else {
        res.json(mentor);
      }
    });
  },

  // Retrieve a mentor by name
  findByName: (req, res) => {
    const name = req.params.name;

    Mentor.findByName(name, (err, mentor) => {
      if (err) {
        res.status(500).json({ error: 'Could not find the mentor.' });
      } else {
        if (mentor) {
          res.json(mentor);
        } else {
          res.status(404).json({ error: 'Mentor not found.' });
        }
      }
    });
  },

  // Update a mentor's information
  update: (req, res) => {
    const name = req.params.name;
    const updatedMentor = req.body;

    Mentor.update(name, updatedMentor, (err, numReplaced) => {
      if (err) {
        res.status(500).json({ error: 'Could not update the mentor.' });
      } else {
        res.json({ message: 'Mentor updated successfully', numReplaced });
      }
    });
  },

  // Delete a mentor by name
  delete: (req, res) => {
    const name = req.params.name;

    Mentor.delete(name, (err, numRemoved) => {
      if (err) {
        res.status(500).json({ error: 'Could not delete the mentor.' });
      } else {
        res.json({ message: 'Mentor deleted successfully', numRemoved });
      }
    });
  },
};

module.exports = mentorController;
