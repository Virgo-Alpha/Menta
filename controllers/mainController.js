const Session = require('../models/Session');
const Student = require('../models/Student');

const mainController = {
    // Render the homepage
    renderHomePage: (req, res) => {
      res.render('about'); // Assuming you have a "home.mustache" template for the homepage
    },

    // render student dashboard
    renderStudentDashboard: (req, res) => {
        res.render('student_views/student_dashboard');
    },

    // render mentor dashboard
    renderAdminDashboard: (req, res) => {
        res.render('admin_views/admin_dashboard');
    },

    // render admin sessions view
    renderAdminSessions: (req, res) => {
        // Fetch sessions data from the database
        Session.findAll((err, sessions) => {
          if (err) {
              res.status(500).json({ error: 'Could not retrieve sessions.' });
          } else {
              // Render the admin sessions view and pass sessions data to Mustache template
              res.render('admin_views/admin_sessions', { sessions });
          }
  });
    },

    // render add_session
    renderAddSession: (req, res) => {
        res.render('admin_views/add_session');
    },

    // render edit_session:id
  renderEditSession: (req, res) => {
    const sessionId = req.params.id;

    Session.findById(sessionId, (err, session) => {
      if (err) {
        res.status(500).json({ error: 'Could not find the session.' });
      } else {
        // Render the session details page and pass session data to Mustache template
        res.render('admin_views/edit_session', {
            sessionName: session.sessionName,
            date: session.date,
            startTime: session.startTime,
            endTime: session.endTime,
            category: session.category,
            venue: session.venue,
            mandatory: session.mandatory,
            sessionId: sessionId // Pass sessionId for edit session URL
        });
      }
    });
  },

  // Delete all sessions
  deleteAll: (req, res) => {
    Session.deleteAll((err) => {
      if (err) {
        res.status(500).json({ error: 'Could not delete all sessions.' });
      } else {
        // Redirect to admin sessions view and send ok status
        res.status(200).json({ message: 'OK' });
        
      }
    }
    );
  },

  // Search sessions
  initialSearch: (req, res) => {
      Session.findAll((err, sessions) => {
          if (err) {
              res.status(500).json({ error: 'Failed to fetch sessions.' });
          } else {
              res.render('admin_views/search_sessions', { sessions });
          }
      });
},

// Search sessions
searchSessions: (req, res) => {
  const sessionName = req.query.sessionName || '';
  const categories = req.query.categories || ''; // Get categories from query parameters

  // Convert categories string to an array
  const categoriesArray = categories.split(',');

  // Use the search criteria to query the sessions
  if (sessionName !== '' || categoriesArray.length !== 0) {
    // If search criteria specified, perform search
    Session.search(sessionName, categoriesArray, (err, sessions) => {
        if (err) {
            res.status(500).json({ error: 'Search failed.' });
        } else {
            res.json({ sessions });
        }
    });
} else {
    // If no search criteria specified, fetch all sessions
    Session.findAll((err, sessions) => {
        if (err) {
            res.status(500).json({ error: 'Failed to fetch sessions.' });
        } else {
            res.render('admin_views/search_sessions', { sessions });
        }
    });
    }
},

// render admin students view with students data
renderAdminStudents: (req, res) => {
  Student.findAll((err, students) => {
    if (err) {
        res.status(500).json({ error: 'Could not retrieve sessions.' });
    } else {
        // Render the admin sessions view and pass sessions data to Mustache template
        res.render('admin_views/admin_students', { students });
    }
}
);
},

// render add_student
renderAddStudent: (req, res) => {
  res.render('admin_views/add_student');
},

// delete all students
deleteAllStudents: (req, res) => {
  Student.deleteAll((err) => {
    if (err) {
      res.status(500).json({ error: 'Could not delete all students.' });
    } else {
      // Redirect to admin sessions view and send ok status
      res.status(200).json({ message: 'OK' });
      
    }
  }
  );
},

// initial search students
initialSearchStudents: (req, res) => {
  Student.findAll((err, students) => {
      if (err) {
          res.status(500).json({ error: 'Failed to fetch students.' });
      } else {
          res.render('admin_views/search_students', { students });
      }
  });
},

// search students by firstName, lastName and degreeProgram array
searchStudents: (req, res) => {
  const firstName = req.query.firstName || '';
  const lastName = req.query.lastName || '';
  const degreeProgram = req.query.degreePrograms || ''; // Get degreeProgram from query parameters

  // Convert degreeProgram string to an array
  const degreeProgramArray = degreeProgram.split(',');
  console.log(degreeProgramArray);

  // Use the search criteria to query the students
  if (firstName !== '' || lastName !== '' || degreeProgramArray.length !== 0) {
    // If search criteria specified, perform search
    Student.searchStudents(firstName, lastName, degreeProgramArray, (err, students) => {
        if (err) {
            res.status(500).json({ error: 'Search failed.' });
        } else {
          // render the search_students view and pass students data to Mustache template
          res.json({ students });
        }
    });
}
},

  };
  
module.exports = mainController;
  