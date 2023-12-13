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

  create(username, password, firstName, lastName, email, phoneNumber, callback) {
    console.log("Creating user:", username);
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
          callback(err);
        } else {
          console.log("Inserted user:", username);
          callback(null, entry);
        }
      });
    });
  }

  lookup(user, cb) {
  UserDB.findOne({ user: user }, function (err, userEntry) {
    if (err || !userEntry) {
      return cb(null, null);
    }
    return cb(null, userEntry);
  });
}

}

const dao = new UserDAO(UserDB);
dao.init();
dao.create('newUser', 'newPassword', 'John', 'Doe', 'john@example.com', '1234567890', (err, user) => {
    if (err) {
      console.error('Error creating user:', err);
      // Handle the error here
    } else {
      // console.log('User created:', user);
      // Handle successful user creation here
    }
  });
  
module.exports = dao;
