const Datastore = require('nedb');

const sessionDB = new Datastore({ filename: './data/sessions.db', autoload: true });

class Session {
  constructor(sessionName, date, startTime, endTime, venue, category, menteeList, active, mandatory, id) {
    this.menteeList = menteeList;
    this.sessionName = sessionName;
    this.date = new Date(date);
    this.startTime = startTime;
    this.endTime = endTime;
    this.venue = venue;
    this.category = category;
    this.active = active;
    this.id = id;
    this.mandatory = mandatory;
  }

  static findAll(callback) {
    sessionDB.find({}, (err, sessions) => {
      if (err) {
        callback(err);
      } else {
        callback(null, sessions);
      }
    });
  }

  static findByMentee(menteeName, callback) {
    sessionDB.find({ menteeList: menteeName }, (err, sessions) => {
      if (err) {
        callback(err);
      } else {
        callback(null, sessions);
      }
    });
  }

  static findByName(sessionName, callback) {
    sessionDB.find({ sessionName }, (err, sessions) => {
      if (err) {
        callback(err);
      } else {
        callback(null, sessions);
      }
    });
  }

  static findByTime(startTime, endTime, callback) {
    sessionDB.find({ startTime, endTime }, (err, sessions) => {
      if (err) {
        callback(err);
      } else {
        callback(null, sessions);
      }
    });
  }

  static findByCategory(category, callback) {
    sessionDB.find({ category }, (err, sessions) => {
      if (err) {
        callback(err);
      } else {
        callback(null, sessions);
      }
    });
  }

  static checkAndUpdateActiveSessions(callback) {
    sessionDB.update(
      { date: { $lt: new Date() }, active: true },
      { $set: { active: false } },
      { multi: true },
      (err, numReplaced) => {
        if (err) {
          callback(err);
        } else {
          callback(null, numReplaced);
        }
      }
    );
  }

  static create(session, callback) {
    sessionDB.insert(session, (err, newSession) => {
      if (err) {
        callback(err);
      } else {
        callback(null, newSession);
      }
    });
  }

  static update(sessionID, menteeList, sessionName, date, startTime, endTime, venue, category, active, callback) {
    const updateData = {
      menteeList,
      sessionName,
      date: new Date(date),
      startTime,
      endTime,
      venue,
      category,
      mandatory: false,
      active
    };

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
}


module.exports = Session;
