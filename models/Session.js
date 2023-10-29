const Datastore = require('nedb');

const sessionDB = new Datastore({ filename: './data/sessions.db', autoload: true });

class Session {
  constructor(mentorName, menteeName, date, time, category, id) {
    this.mentorName = mentorName;
    this.menteeName = menteeName;
    this.date = date;
    this.time = time;
    this.category = category;
    this.id = id;
  }

  // Create a new session record
  static create(session, callback) {
    sessionDB.insert(session, (err, newSession) => {
      if (err) {
        callback(err);
      } else {
        callback(null, newSession);
      }
    });
  }

  // Find sessions based on mentor or mentee names, or category
  static findSessions(mentorName, menteeName, category, callback) {
    const query = {};

    if (mentorName) {
      query.mentorName = mentorName;
    }
    if (menteeName) {
      query.menteeName = menteeName;
    }
    if (category) {
      query.category = category;
    }

    sessionDB.find(query, (err, sessions) => {
      if (err) {
        callback(err);
      } else {
        callback(null, sessions);
      }
    });
  }

  // Update a session
  static update(sessionID, mentorName, menteeName, date, time, category, callback) {
    const updateData = { mentorName, menteeName, date, time, category };

    sessionDB.update({ _id: sessionID }, { $set: updateData }, {}, (err, numReplaced) => {
      if (err) {
        callback(err);
      } else {
        sessionDB.findOne({ _id: sessionID }, (err, updatedSession) => {
          if (err) {
            callback(err);
          } else {
            callback(null, updatedSession);
          }
        });
      }
    });
  }

// Delete a session by ID
static delete(sessionId, callback) {
    sessionDB.remove({ id: sessionId }, {}, (err, numRemoved) => {
        if (err) {
            callback(err);
        } else if (numRemoved === 0) {
            callback(null, null); // Session not found
        } else {
            callback(null, { _id: sessionId });
        }
    });
}
};


module.exports = Session;
