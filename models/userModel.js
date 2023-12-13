const Datastore = require("nedb");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const UserDB = new Datastore({ filename: './data/users.db', autoload: true });

// clear out the database
UserDB.remove({}, { multi: true });

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
    UserDB.insert({
      user: "Peter",
      password: "$2b$10$I82WRFuGghOMjtu3LLZW9OAMrmYOlMZjEEkh.vx.K2MM05iu5hY2C",
      firstName: "Peter",
      lastName: "Parker",
      email: "peter@example.com",
      phoneNumber: "1234567890",
    });
    UserDB.insert({
      user: "Ann",
      password: "$2b$10$bnEYkqZM.MhEF/LycycymOeVwkQONq8kuAUGx6G5tF9UtUcaYDs3S",
      firstName: "Ann",
      lastName: "Smith",
      email: "ann@example.com",
      phoneNumber: "9876543210",
    });
    return this;
  }

  create(username, password, firstName, lastName, email, phoneNumber) {
    const that = this;
    bcrypt.hash(password, saltRounds).then(function (hash) {
      var entry = {
        user: username,
        password: hash,
        firstName: firstName,
        lastName: lastName,
        email: email,
        phoneNumber: phoneNumber,
      };
      UserDB.insert(entry, function (err) {
        if (err) {
          console.log("Can't insert user:", username);
        }
      });
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
