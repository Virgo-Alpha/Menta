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

  static findAll(callback) {
    sessionDB.find({}, (err, sessions) => {
      if (err) {
        callback(err);
      } else {
        callback(null, sessions);
      }
    });
  }

  static delete(sessionId, callback) {
    sessionDB.remove({ _id: sessionId }, {}, (err, numRemoved) => {
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

  static search(sessionName, categories, callback) {
    const query = {
        sessionName: { $regex: new RegExp(sessionName, 'i') },
        category: { $in: categories }
    };

    sessionDB.find(query, (err, sessions) => {
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
        console.log(session);
        callback(null, session);
      }
    });
  }

  // find multiple by Id
  static findByIds(sessionIds, callback) {
    sessionDB.find({ _id: { $in: sessionIds } }, (err, sessions) => {
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
}


// Creating 10 different sessions
const sessions = [
  {
    sessionName: 'Grad School Prep',
    date: '2023-12-15',
    startTime: '09:00',
    endTime: '11:00',
    category: 'Grad School',
    venue: 'Virtual',
    mandatory: true,
    menteeList: [],
  },
  {
    sessionName: 'STAR Resume Review',
    date: '2023-12-16',
    startTime: '10:00',
    endTime: '12:00',
    category: 'Resume Review',
    venue: 'Office',
    mandatory: true,
    menteeList: [],
  },
  {
    sessionName: 'How to be an Entrepreneur',
    date: '2023-12-17',
    startTime: '11:00',
    endTime: '13:00',
    category: 'Entrepreneurship',
    venue: 'Virtual',
    mandatory: true,
    menteeList: [],
  },
  {
    sessionName: 'Lifelong Career Advice',
    date: '2023-12-18',
    startTime: '12:00',
    endTime: '14:00',
    category: 'Career advice',
    venue: 'Office',
    mandatory: true,
    menteeList: [],
  },
  {
    sessionName: 'Mock Interview 1',
    date: '2023-12-19',
    startTime: '13:00',
    endTime: '15:00',
    category: 'Mock Interview',
    venue: 'Virtual',
    mandatory: true,
    menteeList: [],
  },
  {
    sessionName: 'Mock Interview 2',
    date: '2023-12-20',
    startTime: '14:00',
    endTime: '16:00',
    category: 'Mock Interview',
    venue: 'Office',
    mandatory: true,
    menteeList: [],
  },
  {
    sessionName: 'Session 7',
    date: '2023-12-21',
    startTime: '15:00',
    endTime: '17:00',
    category: 'General',
    venue: 'Virtual',
    mandatory: true,
    menteeList: [],
  },
  {
    sessionName: 'Session 8',
    date: '2023-12-22',
    startTime: '16:00',
    endTime: '18:00',
    category: 'General',
    venue: 'Office',
    mandatory: true,
    menteeList: [],
  },
  {
    sessionName: 'Session 9',
    date: '2023-12-23',
    startTime: '17:00',
    endTime: '19:00',
    category: 'General',
    venue: 'Virtual',
    mandatory: true,
    menteeList: [],
  },
  {
    sessionName: 'Session 10',
    date: '2023-12-24',
    startTime: '18:00',
    endTime: '20:00',
    category: 'General',
    venue: 'Office',
    mandatory: true,
    menteeList: [],
  },
];
// clear Sessions in DB
Session.deleteAll(function(err, numRemoved) {
  if (err) {
    console.error('Error deleting sessions:', err);
  } else {
    console.log('Sessions deleted:', numRemoved);
  }
});

// Inserting sessions into the database
sessions.forEach(session => {
  const newSession = new Session(
    session.sessionName,
    session.date,
    session.startTime,
    session.endTime,
    session.category,
    session.venue,
    session.mandatory,
    session.menteeList
  );

  Session.create(newSession, (err, createdSession) => {
    if (err) {
      console.error('Error creating session:', err);
    } else {
      // console.log('Session created:', createdSession);
    }
  });
});



module.exports = Session;
