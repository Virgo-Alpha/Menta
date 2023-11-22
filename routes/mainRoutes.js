// mainRoutes.js
const express = require('express');
const router = express.Router();

const mainController = require('../controllers/mainController');
const studentController = require('../controllers/studentController');
const mentorController = require('../controllers/mentorController');
const sessionController = require('../controllers/sessionController');

// Route for the homepage ("/")
router.get('/', mainController.renderHomePage);
router.get('/student_dashboard', mainController.renderStudentDashboard);
router.get('/admin_dashboard', mainController.renderAdminDashboard);

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
router.post('/sessions/:id', sessionController.findById);
router.post('/sessions/:name', sessionController.findByName);
router.post('/sessions/:name', sessionController.findByMentee);
router.post('/sessions/:name', sessionController.findByMentor);
router.post('/sessions/:category', sessionController.findByCategory);
router.post('/sessions/:time', sessionController.findByTime);
router.post('/sessions/:category', sessionController.findByCategory);
router.put('/sessions/:id', sessionController.update);
router.delete('/sessions/:id', sessionController.delete);

module.exports = router;
