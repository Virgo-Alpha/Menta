const Mentor = require('../models/Mentor');

const mentorController = {
  // Create a new mentor
  create: (req, res) => {
    const { firstName, lastName, dateOfBirth, gender, profession, industry} = req.body;
    const newMentor = new Mentor(firstName, lastName, dateOfBirth, gender, profession, industry);

    Mentor.create(newMentor, (err, mentor) => {
      if (err) {
        res.status(500).json({ error: 'Could not create a new mentor.' });
      } else {
        res.render('admin_views/submittedMentor', {
          mentor_id: mentor._id,
          firstName: mentor.firstName,
          lastName: mentor.lastName,
          Age: mentor.Age,
          gender: mentor.gender,
          profession: mentor.profession,
          industry: mentor.industry,
        });
      }
    });
  },

  // Find all mentors
  findAll: (req, res) => {
    Mentor.findAll((err, mentors) => {
      if (err) {
        res.status(500).json({ error: 'Could not find mentors.' });
      } else {
        res.json(mentors);
      }
    });
  },

  // Retrieve a mentor by ID
  findById: (req, res) => {
    const mentor_id = req.params.id;

    Mentor.findById(mentor_id, (err, mentor) => {
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
    const mentor_id = req.params.id;
    const { firstName, lastName, dateOfBirth, gender, profession, industry} = req.body;

    // Check for empty values before updating
    const updateData = {};
    if (firstName) updateData.firstName = firstName;
    if (lastName) updateData.lastName = lastName;
    if (dateOfBirth) updateData.dateOfBirth = dateOfBirth;
    if (gender) updateData.gender = gender;
    if (profession) updateData.profession = profession;
    if (industry) updateData.industry = industry;

    Mentor.update(mentor_id, updateData, (err, updatedMentor) => {
      if (err) {
        res.status(500).json({ error: 'Could not update the mentor.' });
      } else {
        // Render the updated mentor details page
        res.render('admin_views/updatedMentor', {
          mentor_id: updatedMentor._id,
          firstName: updatedMentor.firstName,
          lastName: updatedMentor.lastName,
          Age: updatedMentor.Age,
          gender: updatedMentor.gender,
          profession: updatedMentor.profession,
          industry: updatedMentor.industry,
        });
      }
    });
  },

  // Delete a mentor by   D
  delete: (req, res) => {
    const mentor_id = req.params.id;

    Mentor.delete(mentor_id, (err, numRemoved) => {
      if (err) {
        res.status(500).json({ error: 'Could not delete the mentor.' });
      } else {
        res.json({ message: 'Mentor deleted successfully', numRemoved });
      }
    });
  },
};

module.exports = mentorController;
