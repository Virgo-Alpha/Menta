const Session = require('../models/Session');

const sessionController = {
  // Create a new session
  create: (req, res) => {
    const { mentorName, menteeName, date, startTime, endTime, category, venue, active } = req.body;
    const newSession = new Session(mentorName, menteeName, date, startTime, endTime, category, venue, active);

    Session.create(newSession, (err, session) => {
      if (err) {
        res.status(500).json({ error: 'Could not create a new session.' });
      } else {
        res.json(session);
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

  // Find session by Mentor
findByMentor: (req, res) => {
  const mentorName = req.query.mentorName;

  Session.findByMentor(mentorName, (err, sessions) => {
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

  // Update a session by ID
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
