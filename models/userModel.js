const Datastore = require("nedb");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const UserDB = new Datastore({ filename: './data/users.db', autoload: true });
const Student = require("./Student");

// clear out the database
UserDB.remove({}, { multi: true }) 

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
  init() {
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
        username: "student1",
        password: "student1password",
        firstName: "Student",
        lastName: "One",
        email: "student1@example.com",
        phoneNumber: "1112223333",
        role: "student",
      },
      {
        username: "student2",
        password: "student2password",
        firstName: "Student",
        lastName: "Two",
        email: "student2@example.com",
        phoneNumber: "4445556666",
        role: "student",
      },
      {
        username: "student3",
        password: "student3password",
        firstName: "Student",
        lastName: "Three",
        email: "student3@example.com",
        phoneNumber: "7778889999",
        role: "student",
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
      this.create(student.username, student.password, student.firstName, student.lastName, student.email, student.phoneNumber, student.role, (err, user) => {
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

  create(username, password, firstName, lastName, email, phoneNumber, role) {
    const that = this;
    bcrypt.hash(password, saltRounds).then(function (hash) {
      var entry = {
        user: username,
        password: hash,
        firstName: firstName,
        lastName: lastName,
        email: email,
        phoneNumber: phoneNumber,
        role: role,
      };
      UserDB.insert(entry, function (err) {
        if (err) {
          console.log("Can't insert user:", username);
        }
      });
      if (role == "student") {
        var student = {
            user: username,
            firstName: firstName,
            lastName: lastName,
            studentEmail: email,
        }
        Student.create(student, function (err) {
            if (err) {
                console.log("Can't insert student:", username);
            }
        });
      }
    });
  }

  lookup(user, cb) {
    UserDB.find(
      {
        user: user,
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
dao.init();
dao.create('newUser', 'newPassword', 'John', 'Doe', 'john@example.com', '1234567890');
module.exports = dao;
