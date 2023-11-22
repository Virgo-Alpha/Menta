const Session = require('../models/Session');

const sessionController = {
  // Create a new session
  create: (req, res) => {
    const { mentorName, menteeName, date, time, category } = req.body;
    const newSession = new Session(mentorName, menteeName, date, time, category);

    Session.create(newSession, (err, session) => {
      if (err) {
        res.status(500).json({ error: 'Could not create a new session.' });
      } else {
        res.json(session);
      }
    });
  },

  // Find sessions based on mentor or mentee names, or category
  findSessions: (req, res) => {
    const mentorName = req.query.mentorName;
    const menteeName = req.query.menteeName;
    const category = req.query.category;
    const sessionID = req.params.id;

    Session.findSessions(mentorName, menteeName, category, (err, sessions) => {
      if (err) {
        res.status(500).json({ error: 'Could not find sessions.' });
      } else {
        res.json(sessions);
      }
    });
  },

  // Update a session
  update: (req, res) => {
    const sessionID = req.params.id; // Get session ID from the request parameters
    const { mentorName, menteeName, date, time, category } = req.body;

    Session.update(sessionID, mentorName, menteeName, date, time, category, (err, updatedSession) => {
      if (err) {
        res.status(500).json({ error: 'Could not update the session.' });
      } else {
        res.json(updatedSession);
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
}
};


module.exports = sessionController;
