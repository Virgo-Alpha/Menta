const Datastore = require('nedb');
const mentorDB = new Datastore({ filename: './data/mentors.db', autoload: true });

class Mentor {
  constructor(firstName, lastName, dateOfBirth, gender, profession, industry) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.dateOfBirth = dateOfBirth;
    this.gender = gender;
    this.profession = profession;
    this.industry = industry;
    this.Age = new Date().getFullYear() - new Date(dateOfBirth).getFullYear();
  }

  // Create a new mentor record
  static create(mentor, callback) {

    //calculate Age
    const dob = new Date(mentor.dateOfBirth);
    const currentYear = new Date().getFullYear();
    const Age = currentYear - dob.getFullYear();

    mentor.Age = Age;
    
    mentorDB.insert(mentor, (err, newMentor) => {
      if (err) {
        callback(err);
      } else {
        callback(null, newMentor);
      }
    });
  }

  // Find all mentors
  static findAll(callback) {
    mentorDB.find({}, (err, mentors) => {
      if (err) {
        callback(err);
      } else {
        callback(null, mentors);
      }
    });
  }

  // Find a mentor by their ID
  static findById(mentor_id, callback) {
    mentorDB.findOne({ _id: mentor_id }, (err, mentor) => {
      if (err) {
        callback(err);
      } else {
        callback(null, mentor);
      }
    });
  }

  // Find a mentor by their firstName, lastName, industry and profession
  static searchMentors(firstName, lastName, industry, profession, callback) {
    const query = {
      firstName: { $regex: new RegExp(firstName, 'i') },
      lastName: { $regex: new RegExp(lastName, 'i') },
      industry: { $regex: new RegExp(industry, 'i') },
      profession: { $regex: new RegExp(profession, 'i') }
    }

    mentorDB.find(query, (err, mentors) => {
      if (err) {
        callback(err);
      } else {
        callback(null, mentors);
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
  static update(mentor_id, updateData, callback) {
    mentorDB.update({ _id: mentor_id }, { $set: updateData }, {}, (err, numReplaced) => {
      if (err) {
        callback(err);
      } else {
        mentorDB.findOne({ _id: mentor_id }, (err, updatedMentor) => {
          if (err) {
            callback(err);
          } else {
            callback(null, updatedMentor); // Pass the updated mentor to the callback
          }
        });
      }
    });
  }

  // Delete a mentor's record by their id
  static delete(mentor_id, callback) {
    mentorDB.remove({ _id: mentor_id }, {}, (err, numRemoved) => {
      if (err) {
        callback(err);
      } else {
        callback(null, numRemoved);
      }
    });
  }

  // Delete all mentors
  static deleteAll(callback) {
    mentorDB.remove({}, { multi: true }, (err, numRemoved) => {
      if (err) {
        callback(err);
      } else {
        callback(null, numRemoved);
      }
    });
  }
}

const mentors = [
  {
    firstName: 'John',
    lastName: 'Doe',
    dateOfBirth: '1990-05-15',
    gender: 'Male',
    profession: 'Software Engineer',
    industry: 'Technology',
  },
  {
    firstName: 'Jane',
    lastName: 'Smith',
    dateOfBirth: '1985-10-20',
    gender: 'Female',
    profession: 'Marketing Manager',
    industry: 'Marketing',
  },
  {
    firstName: 'Alice',
    lastName: 'Johnson',
    dateOfBirth: '1992-08-25',
    gender: 'Female',
    profession: 'Data Analyst',
    industry: 'Data Science',
  },
  {
    firstName: 'Bob',
    lastName: 'Williams',
    dateOfBirth: '1988-03-12',
    gender: 'Male',
    profession: 'Financial Advisor',
    industry: 'Finance',
  },
  {
    firstName: 'Emma',
    lastName: 'Brown',
    dateOfBirth: '1995-12-03',
    gender: 'Female',
    profession: 'Graphic Designer',
    industry: 'Design',
  },
];

// clear mentors
Mentor.deleteAll((err, numRemoved) => {
  if (err) {
    console.error('Error deleting mentors:', err);
  } else {
    console.log(`Deleted ${numRemoved} mentors`);
  }
});

mentors.forEach(mentor => {
  Mentor.create(
    mentor,
    (err, newMentor) => {
      if (err) {
        console.error('Error creating mentor:', err);
      } else {
        // console.log('Mentor created:', newMentor);
      }
    }
  );
});

module.exports = Mentor;
