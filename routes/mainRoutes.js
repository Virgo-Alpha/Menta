// mainRoutes.js
const express = require('express');
const router = express.Router();
const {login} = require('../.auth/auth');
const {verify} = require('../.auth/auth');
const {verify_admin} = require('../.auth/auth');

const mainController = require('../controllers/mainController');
const studentController = require('../controllers/studentController');
const mentorController = require('../controllers/mentorController');
const sessionController = require('../controllers/sessionController');

// Route for the homepage ("/")
router.get('/', mainController.renderHomePage);
router.get('/student_dashboard', mainController.renderStudentDashboard);
router.get('/admin_dashboard', verify_admin, mainController.renderAdminDashboard);
router.get('/admin_sessions', verify, mainController.renderAdminSessions);
router.get('/admin_students', verify, mainController.renderAdminStudents);
router.get('/admin_mentors', verify, mainController.renderAdminMentors);
router.get('/student_sessions', verify, mainController.renderStudentSessions);
router.get('/register', mainController.renderRegister);
router.post('/register', mainController.register);
router.get('/login', mainController.renderLogin);
router.post('/login', login, mainController.handle_login);
router.get('/logout', verify, mainController.handle_logout);
// router.get('added_sessions', verify, mainController.renderAddedSessions);
router.get('/student_goals', verify, mainController.renderStudentGoals);
router.get('/add_studentGoal', verify, mainController.renderAddStudentGoal);
router.post('/add_studentGoal', verify, mainController.addStudentGoal);
router.delete('/student_goals', verify, mainController.deleteAllStudentGoals);
router.get('/added_sessions', verify, mainController.renderAllStudentSessions);
router.get('/admin_opportunity', verify, mainController.renderAdminOpportunity);
router.get('/admin_settings', verify, mainController.renderAdminSettings);
router.get('/admin_profile', verify, mainController.renderAdminProfile);
router.get('/admin_report', verify, mainController.renderAdminReport);

// Students Routes
router.get('/add_student', verify, mainController.renderAddStudent);
router.post('/add_student', verify, studentController.create);
router.get('/edit_student/:id', verify, mainController.renderEditStudent);
router.post('/edit_student/:id', verify, studentController.update);
router.delete('/admin_students', verify, mainController.deleteAllStudents);
router.delete('/admin_students/:id', verify, studentController.delete);
router.get('/search_students', verify, mainController.initialSearchStudents);
router.post('/search_students', verify, mainController.searchStudents);
router.get('/search_studentSessions', verify, mainController.initialSearchStudentSessions);
router.post('/search_studentSessions', verify, mainController.searchStudentSessions);
router.get('/add_studentSession/:id', verify, mainController.renderAddStudentSession);
router.get('/student_opportunity', verify, studentController.renderStudentOpportunity);
router.get('/student_profile', verify, studentController.renderStudentProfile);
router.get('/student_settings', verify, studentController.renderStudentSettings);
router.get('/student_report', verify, studentController.renderStudentReport);

router.post('/students', studentController.create);
router.get('/students/:id', studentController.findById);
router.put('/students/:id', studentController.update);

// Mentors Routes
router.get('/add_mentor', verify, mainController.renderAddMentor);
router.post('/add_mentor', verify, mentorController.create);
router.get('/edit_mentor/:id', verify, mainController.renderEditMentor);
router.post('/edit_mentor/:id',  verify, mentorController.update);
router.delete('/admin_mentors', verify, mainController.deleteAllMentors);
router.delete('/admin_mentors/:id', verify, mentorController.delete);
router.get('/search_mentors', verify, mainController.initialSearchMentors);
router.post('/search_mentors', verify, mainController.searchMentors);

// Sessions Routes
router.get('/add_session', verify, mainController.renderAddSession);

router.post('/add_session', verify_admin, sessionController.create);
router.get('/edit_session/:id', verify, mainController.renderEditSession);
router.post('/edit_session/:id', verify, sessionController.update);
router.delete('/admin_sessions', verify_admin, mainController.deleteAll);
router.delete('/admin_sessions/:id', verify, sessionController.delete);
router.get('/search_sessions', verify, mainController.initialSearch);
router.post('/search_sessions', verify, mainController.searchSessions);

module.exports = router;
