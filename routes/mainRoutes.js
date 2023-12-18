// mainRoutes.js
const express = require('express');
const router = express.Router();

const passport = require('../config/passport');

const mainController = require('../controllers/mainController');
const studentController = require('../controllers/studentController');
const mentorController = require('../controllers/mentorController');
const sessionController = require('../controllers/sessionController');
const authController = require('../controllers/authController');
const { ensureAuthenticated, ensureAdmin, ensureStudent } = require('../middlewares/authMiddleware');

// admin routes
router.get('/admin_dashboard', ensureAdmin, mainController.renderAdminDashboard);
router.get('/admin_sessions', ensureAdmin, mainController.renderAdminSessions);
router.get('/admin_students', ensureAdmin, mainController.renderAdminStudents);
router.get('/admin_mentors', ensureAdmin, mainController.renderAdminMentors);
router.get('/admin_opportunity', ensureAdmin, mainController.renderAdminOpportunity);
router.get('/admin_settings', ensureAdmin, mainController.renderAdminSettings);
router.get('/admin_profile', ensureAdmin, mainController.renderAdminProfile);
router.get('/admin_report', ensureAdmin, mainController.renderAdminReport);

// Route for the homepage ("/")
router.get('/', mainController.renderHomePage);
router.get('/student_dashboard', mainController.renderStudentDashboard);
router.get('/student_sessions', ensureAuthenticated, mainController.renderStudentSessions);
router.get('/register', mainController.renderRegister);
router.post('/register', mainController.register);
router.get('/login', authController.renderLogin);

router.post('/login', authController.handle_login);
  
router.get('/logout', ensureAuthenticated, authController.handle_logout);

router.get('/student_goals', ensureAuthenticated, mainController.renderStudentGoals);
router.get('/add_studentGoal', ensureAuthenticated, mainController.renderAddStudentGoal);
router.post('/add_studentGoal', ensureAuthenticated, mainController.addStudentGoal);
router.delete('/student_goals', ensureAuthenticated, mainController.deleteAllStudentGoals);
router.get('/added_sessions', ensureAuthenticated, mainController.renderAllStudentSessions);

// Students Routes
router.get('/add_student', ensureAuthenticated, mainController.renderAddStudent);
router.post('/add_student', ensureAuthenticated, studentController.create);
router.get('/edit_student/:id', ensureAuthenticated, mainController.renderEditStudent);
router.post('/edit_student/:id', ensureAuthenticated, studentController.update);
router.delete('/admin_students', ensureAuthenticated, mainController.deleteAllStudents);
router.delete('/admin_students/:id', ensureAuthenticated, studentController.delete);
router.get('/search_students', ensureAuthenticated, mainController.initialSearchStudents);
router.post('/search_students', ensureAuthenticated, mainController.searchStudents);
router.get('/search_studentSessions', ensureAuthenticated, mainController.initialSearchStudentSessions);
router.post('/search_studentSessions', ensureAuthenticated, mainController.searchStudentSessions);
router.get('/add_studentSession/:id', ensureAuthenticated, mainController.renderAddStudentSession);
router.get('/student_opportunity', ensureAuthenticated, studentController.renderStudentOpportunity);
router.get('/student_profile', ensureAuthenticated, studentController.renderStudentProfile);
router.get('/student_settings', ensureAuthenticated, studentController.renderStudentSettings);
router.get('/student_report', ensureAuthenticated, studentController.renderStudentReport);

router.post('/students', studentController.create);
router.get('/students/:id', studentController.findById);
router.put('/students/:id', studentController.update);

// Mentors Routes
router.get('/add_mentor', ensureAuthenticated, mainController.renderAddMentor);
router.post('/add_mentor', ensureAuthenticated, mentorController.create);
router.get('/edit_mentor/:id', ensureAuthenticated, mainController.renderEditMentor);
router.post('/edit_mentor/:id',  ensureAuthenticated, mentorController.update);
router.delete('/admin_mentors', ensureAuthenticated, mainController.deleteAllMentors);
router.delete('/admin_mentors/:id', ensureAuthenticated, mentorController.delete);
router.get('/search_mentors', ensureAuthenticated, mainController.initialSearchMentors);
router.post('/search_mentors', ensureAuthenticated, mainController.searchMentors);

// Sessions Routes
router.get('/add_session', ensureAuthenticated, mainController.renderAddSession);

router.post('/add_session', ensureAuthenticated, sessionController.create);
router.get('/edit_session/:id', ensureAuthenticated, mainController.renderEditSession);
router.post('/edit_session/:id', ensureAuthenticated, sessionController.update);
router.delete('/admin_sessions', ensureAdmin, mainController.deleteAll);
router.delete('/admin_sessions/:id', ensureAuthenticated, sessionController.delete);
router.get('/search_sessions', ensureAuthenticated, mainController.initialSearch);
router.post('/search_sessions', ensureAuthenticated, mainController.searchSessions);

module.exports = router;
