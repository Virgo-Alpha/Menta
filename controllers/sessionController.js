const Session = require('../models/Session');

const sessionController = {
  // Create a new session
  create: (req, res) => {
    const { sessionName, date, startTime, endTime, category, venue, mandatory } = req.body;
    const newSession = new Session(sessionName, date, startTime, endTime, category, venue, mandatory);

    Session.create(newSession, (err, session) => {
      if (err) {
        res.status(500).json({ error: 'Could not create a new session.' });
      } else {
        const sessionId = session._id; // Replace this with your actual sessionId variable

            // Render the session details page and pass session data to Mustache template
            res.render('admin_views/submittedSession', { 
                sessionName: session.sessionName,
                date: session.date,
                startTime: session.startTime,
                endTime: session.endTime,
                category: session.category,
                venue: session.venue,
                sessionId: sessionId // Pass sessionId for edit session URL
            });
      }
    });
  },

  // Find All sessions
  findSessions: (req, res) => {
    Session.findAll((err, sessions) => {
      if (err) {
        res.status(500).json({ error: 'Could not find sessions.' });
      } else {
        res.json(sessions);
      }
    });
  },

  // ! Update a session by ID
  update: (req, res) => {
    const sessionID = req.params.id; // Get session ID from the request parameters
    const { sessionName, date, startTime, endTime, category, venue, mandatory, menteeList } = req.body;

    // Check for empty values before updating
    const updateData = {};
    if (sessionName) updateData.sessionName = sessionName;
    if (date) updateData.date = date;
    if (startTime) updateData.startTime = startTime;
    if (endTime) updateData.endTime = endTime;
    if (category) updateData.category = category;
    if (venue) updateData.venue = venue;
    if (mandatory) updateData.mandatory = mandatory;
    if (menteeList) updateData.menteeList = menteeList;

    Session.update(updateData, sessionID, (err, updatedSession) => {
        if (err) {
            res.status(500).json({ error: 'Could not update the session.' });
        } else {
            // Render the updated session details page
            res.render('admin_views/updatedSession', {
                sessionName: updatedSession.sessionName,
                date: updatedSession.date,
                startTime: updatedSession.startTime,
                endTime: updatedSession.endTime,
                category: updatedSession.category,
                venue: updatedSession.venue,
                mandatory: updatedSession.mandatory,
                menteeList: updatedSession.menteeList,
                sessionId: sessionID // Pass sessionId for edit session URL
            });
        }
    });
},

  // Delete a session by ID
  delete: (req, res) => {
    const sessionId = req.params.id;

    Session.delete(sessionId, (err, deletedSession) => {
      if (err) {
        res.status(500).json({ error: 'Could not delete the session.' });
      } else if (!deletedSession) {
        res.status(404).json({ error: 'Session not found.' });
      } else {
        res.json(deletedSession);
      }
    });
  },

  // Find session by ID
  findById: (req, res) => {
    const sessionId = req.params.id;

    Session.findById(sessionId, (err, session) => {
      if (err) {
        res.status(500).json({ error: 'Could not find the session.' });
      } else {
        res.json(session);
      }
    });
  },

  // Find session by name
  findByName: (req, res) => {
    const sessionName = req.query.sessionName;

    Session.findByName(sessionName, (err, sessions) => {
      if (err) {
        res.status(500).json({ error: 'Could not find sessions.' });
      } else {
        res.json(sessions);
      }
    });
  },

  // Find session by time
  findByTime: (req, res) => {
    const startTime = req.query.startTime;
    const endTime = req.query.endTime;

    Session.findByTime(startTime, endTime, (err, sessions) => {
      if (err) {
        res.status(500).json({ error: 'Could not find sessions.' });
      } else {
        res.json(sessions);
      }
    });
  },

// Find session by Mentee
findByMentee: (req, res) => {
  const menteeName = req.query.menteeName;

  Session.findByMentee(menteeName, (err, sessions) => {
    if (err) {
      res.status(500).json({ error: 'Could not find sessions.' });
    } else {
      res.json(sessions);
    }
  });
},

// Find session by Category
findByCategory: (req, res) => {
  const category = req.query.category;

  Session.findByCategory(category, (err, sessions) => {
    if (err) {
      res.status(500).json({ error: 'Could not find sessions.' });
    } else {
      res.json(sessions);
    }
  });
},
};

module.exports = sessionController;
