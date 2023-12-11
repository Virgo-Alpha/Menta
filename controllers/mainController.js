const Session = require('../models/Session');

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

  // Delete a session by ID
  delete: (req, res) => {
    const sessionId = req.params.id;

    Session.delete(sessionId, (err) => {
      if (err) {
        res.status(500).json({ error: 'Could not delete the session.' });
      } else {
        // Redirect to admin sessions view
        res.redirect('/admin_sessions');
      }
    }
    );
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

  };
  
module.exports = mainController;
  