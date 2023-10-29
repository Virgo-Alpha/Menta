const Datastore = require('nedb');
const mentorDB = new Datastore({ filename: './data/mentors.db', autoload: true });

class Mentor {
  constructor(name, age, profession, industry, gradYear, gender) {
    this.name = name;
    this.age = age;
    this.profession = profession;
    this.industry = industry;
    this.gradYear = gradYear;
    this.gender = gender;
  }

  // Create a new mentor record
  static create(mentor, callback) {
    mentorDB.insert(mentor, (err, newMentor) => {
      if (err) {
        callback(err);
      } else {
        callback(null, newMentor);
      }
    });
  }

  // Find a mentor by their name
  static findByName(name, callback) {
    mentorDB.findOne({ name }, (err, mentor) => {
      if (err) {
        callback(err);
      } else {
        callback(null, mentor);
      }
    });
  }

  // Update a mentor's record
  static update(name, updatedMentor, callback) {
    mentorDB.update({ name }, { $set: updatedMentor }, {}, (err, numReplaced) => {
      if (err) {
        callback(err);
      } else {
        callback(null, numReplaced);
      }
    });
  }

  // Delete a mentor's record by their name
  static delete(name, callback) {
    mentorDB.remove({ name }, {}, (err, numRemoved) => {
      if (err) {
        callback(err);
      } else {
        callback(null, numRemoved);
      }
    });
  }
}

module.exports = Mentor;
