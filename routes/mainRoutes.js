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
router.get('/admin_sessions', mainController.renderAdminSessions);
router.get('/admin_students', mainController.renderAdminStudents);
router.get('/admin_mentors', mainController.renderAdminMentors);
router.get('/student_sessions', mainController.renderStudentSessions);

// Students Routes
router.get('/add_student', mainController.renderAddStudent);
router.post('/add_student', studentController.create);
router.get('/edit_student/:id', mainController.renderEditStudent);
router.post('/edit_student/:id', studentController.update);
router.delete('/admin_students', mainController.deleteAllStudents);
router.delete('/admin_students/:id', studentController.delete);
router.get('/search_students', mainController.initialSearchStudents);
router.post('/search_students', mainController.searchStudents);
router.get('/search_studentSessions', mainController.initialSearchStudentSessions);
router.post('/search_studentSessions', mainController.searchStudentSessions);

router.post('/students', studentController.create);
router.get('/students/:id', studentController.findById);
router.put('/students/:id', studentController.update);

// Mentors Routes
router.get('/add_mentor', mainController.renderAddMentor);
router.post('/add_mentor', mentorController.create);
router.get('/edit_mentor/:id', mainController.renderEditMentor);
router.post('/edit_mentor/:id', mentorController.update);
router.delete('/admin_mentors', mainController.deleteAllMentors);
router.delete('/admin_mentors/:id', mentorController.delete);
router.get('/search_mentors', mainController.initialSearchMentors);
router.post('/search_mentors', mainController.searchMentors);

// Sessions Routes
router.get('/add_session', mainController.renderAddSession);

router.post('/add_session', sessionController.create);
router.get('/edit_session/:id', mainController.renderEditSession);
router.post('/edit_session/:id', sessionController.update);
router.delete('/admin_sessions', mainController.deleteAll);
router.delete('/admin_sessions/:id', sessionController.delete);
router.get('/search_sessions', mainController.initialSearch);
router.post('/search_sessions', mainController.searchSessions);

// ! Not yet used
router.get('/sessions', sessionController.findSessions);
router.post('/sessions/:name', sessionController.findByName);
router.post('/sessions/:name', sessionController.findByMentee);
router.post('/sessions/:category', sessionController.findByCategory);
router.post('/sessions/:time', sessionController.findByTime);
router.post('/sessions/:category', sessionController.findByCategory);
router.put('/sessions/:id', sessionController.update);
router.delete('/sessions/:id', sessionController.delete);

module.exports = router;
