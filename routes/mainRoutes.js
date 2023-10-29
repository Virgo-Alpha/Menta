// mainRoutes.js
const express = require('express');
const router = express.Router();

const mainController = require('../controllers/mainController');
const studentController = require('../controllers/studentController');
const mentorController = require('../controllers/mentorController');
const sessionController = require('../controllers/sessionController');

// Route for the homepage ("/")
router.get('/', mainController.renderHomePage);

// Students Routes
router.post('/students', studentController.create);
router.get('/students/:id', studentController.findById);
router.put('/students/:id', studentController.update);
router.delete('/students/:id', studentController.delete);

// Mentors Routes
router.post('/mentors', mentorController.create);
router.get('/mentors/:name', mentorController.findByName);
router.put('/mentors/:name', mentorController.update);
router.delete('/mentors/:name', mentorController.delete);

// Sessions Routes
router.post('/sessions', sessionController.create);
router.get('/sessions', sessionController.findSessions);
router.delete('/sessions/:id', sessionController.delete);

module.exports = router;
