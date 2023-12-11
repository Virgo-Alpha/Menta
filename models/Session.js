const Datastore = require('nedb');

const sessionDB = new Datastore({ filename: './data/sessions.db', autoload: true });

class Session {
  constructor(sessionName, date, startTime, endTime, category,  venue, mandatory, menteeList) {
    this.sessionName = sessionName;
    this.date = new Date(date);
    this.startTime = startTime;
    this.endTime = endTime;
    this.category = category;
    this.venue = venue;
    this.mandatory = mandatory;
    this.menteeList = menteeList | [];    
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

  static findById(sessionId, callback) {
    sessionDB.findOne({ _id: sessionId }, (err, session) => {
      if (err) {
        callback(err);
      } else {
        callback(null, session);
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

  static create(session, callback) {
    sessionDB.insert(session, (err, newSession) => {
      if (err) {
        callback(err);
      } else {
        callback(null, newSession);
      }
    });
  }

  static update(updateData, sessionID, callback) {
    sessionDB.update({ _id: sessionID }, { $set: updateData }, {}, (err, numReplaced) => {
      if (err) {
        callback(err);
      } else {
        sessionDB.findOne({ _id: sessionID }, (err, updatedSession) => {
          if (err) {
            callback(err);
          } else {
            callback(null, updatedSession); // Pass the updated session to the callback
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

  static deleteAll(callback) {
    sessionDB.remove({}, { multi: true }, (err, numRemoved) => {
      if (err) {
        callback(err);
      } else {
        callback(null, numRemoved);
      }
    });
  }
}


module.exports = Session;
