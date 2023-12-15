const Datastore = require("nedb");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const UserDB = new Datastore({ filename: './data/users.db', autoload: true });
const Student = require("./Student");

class UserDAO {
  constructor(dbFilePath) {
    if (dbFilePath) {
      //embedded
      this.db = new Datastore({ filename: dbFilePath, autoload: true });
    } else {
      //in memory
      this.db = new Datastore();
    }
  }

  // for the demo the password is the bcrypt of the username
  init(callback) {
    const admins = [
      {
        username: "admin1",
        password: "admin1password",
        firstName: "Admin",
        lastName: "One",
        email: "admin1@example.com",
        phoneNumber: "1234567890",
        role: "admin",
      },
      {
        username: "admin2",
        password: "admin2password",
        firstName: "Admin",
        lastName: "Two",
        email: "admin2@example.com",
        phoneNumber: "9876543210",
        role: "admin",
      },
    ];
  
    const students = [
        {
          studentId: "S1",
          username: "student1",
          password: "student1password",
          firstName: "Student",
          lastName: "One",
          email: "student1@example.com",
          phoneNumber: "1112223333",
          role: "student",
          studentId: "S1",
          dateOfBirth: "1999-01-01",
          gender: "Male",
          studentEmail: "student1@example.com",
          enrollmentDate: "2023-09-01",
          degreeProgram: "Computer Science",
          goals: [],
          sessions: [],
        },
        {
          studentId: "S2",
          username: "student2",
          password: "student2password",
          firstName: "Student",
          lastName: "Two",
          email: "student2@example.com",
          phoneNumber: "4445556666",
          role: "student",
          studentId: "S2",
          dateOfBirth: "1998-03-15",
          gender: "Female",
          studentEmail: "student2@example.com",
          enrollmentDate: "2023-09-01",
          degreeProgram: "Electrical Engineering",
          goals: [],
          sessions: [],
        },
        {
          studentId: "S3",
          username: "student3",
          password: "student3password",
          firstName: "Student",
          lastName: "Three",
          email: "student3@example.com",
          phoneNumber: "7778889999",
          role: "student",
          studentId: "S3",
          dateOfBirth: "2000-05-20",
          gender: "Other",
          studentEmail: "student3@example.com",
          enrollmentDate: "2023-09-01",
          degreeProgram: "Social Science",
          goals: [],
          sessions: [],
        },
      ];      
  
    admins.forEach((admin) => {
      this.create(admin.username, admin.password, admin.firstName, admin.lastName, admin.email, admin.phoneNumber, admin.role, (err, user) => {
        if (err) {
          console.error('Error creating admin:', err);
          // Handle the error here
        } else {
          console.log('Admin created:', user);
          // Handle successful admin creation here
        }
      });
    });
  
    students.forEach((student) => {
      this.create(student.username, student.password, student.firstName, student.lastName, student.email, student.phoneNumber, student.role, student.studentId, student.dateOfBirth, student.gender, student.enrollmentDate, student.degreeProgram,  (err, user) => {
        if (err) {
          console.error('Error creating student:', err);
          // Handle the error here
        } else {
          console.log('Student created:', user);
          // Handle successful student creation here
        }
      });
    });
  
    return this;
  }

  create(username, password, firstName, lastName, email, phoneNumber, role, studentId, dateOfBirth, gender, enrollmentDate, degreeProgram, callback) {
    const that = this;
    bcrypt.hash(password, saltRounds).then(function (hash) {
      var entry = {
        username: username,
        password: hash,
        firstName: firstName,
        lastName: lastName,
        email: email,
        phoneNumber: phoneNumber,
        role: role,
      };
      if (role == "student") {
        var student = {
            studentId: studentId,
            firstName: firstName,
            lastName: lastName,
            dateOfBirth: dateOfBirth,
            gender: gender,
            studentEmail: email,
            enrollmentDate: enrollmentDate,
            degreeProgram: degreeProgram,
            goals: [],
            sessions: [],

        }
        Student.create(student, function (err) {
            if (err) {
                console.log("Can't insert student:", username);
            } else {
                console.log("Student inserted:", username);
            }
        });
      }
      UserDB.insert(entry, function (err) {
        if (err) {
          console.log("Can't insert user:", username);
          callback(err, null);
        } else {
            console.log("User inserted:", username);
        }
      });
      callback(null, entry);
    }
    );
  }

  lookup(user, cb) {
    UserDB.find(
      {
        username: user,
      },
      function (err, entries) {
        if (err) {
          return cb(null, null);
        } else {
          if (entries.length == 0) {
            return cb(null, null);
          }
          return cb(null, entries[0]);
        }
      }
    );
  }
}

const dao = new UserDAO(UserDB);

// clear out the database
UserDB.remove({}, { multi: true }, function (err, numRemoved) {
    console.log("Removed", numRemoved, "users");
  });

dao.init();
dao.create('newUser', 'newPassword', 'John', 'Doe', 'john@example.com', '1234567890');
module.exports = dao;
