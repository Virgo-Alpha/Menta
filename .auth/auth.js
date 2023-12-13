const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");

// middlewares
exports.login = function (req, res, next) {
    let username = req.body.username;
    let password = req.body.password;
  
    userModel.lookup(username, function (err, user) {
      if (err) {
        console.log("error looking up user", err);
        return res.status(401).send();
      }
      if (!user) {
        console.log("user ", username, " not found");
        res.render('login', { error: 'User not found or incorrect credentials.' }); // Render login page with an error message
        return;
      }
      //compare provided password with stored password
      bcrypt.compare(password, user.password, function (err, result) {
        if (result) {
          let payload = { username: user.username, role: user.role }; // Include the role in the payload
          let accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);
          res.cookie("jwt", accessToken);
          req.user = { username: user.username, role: user.role }; // Set the req.user with username and role
          next();
        } else {
          res.render('login', { error: 'User not found or incorrect credentials.' }); // Render login page with an error message
          return;
        }
      });
    });
};
  

exports.verify = function (req, res, next) {
  let accessToken = req.cookies.jwt;
  if (!accessToken) {
    res.status(403).send();
    return;
  }
  let payload;
  try {
    payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    req.user = req.body.username;
    next();
  } catch (e) {
    //if an error occurred return request unauthorized error
    res.status(401).send();
  }
};

// verify_admin middleware
exports.verify_admin = function (req, res, next) {
    // Assuming the role is stored in the user object retrieved during login
    if (req.user && req.user.role === 'admin') {
      // User is an admin, allow access to the route
      next();
    } else {
      // User is not an admin, redirect or send an unauthorized response
      res.status(403).send('Unauthorized - Admin access required');
    }
  };
  
  // verify_student middleware
  exports.verify_student = function (req, res, next) {
    // Assuming the role is stored in the user object retrieved during login
    if (req.user && req.user.role === 'student') {
      // User is a student, allow access to the route
      next();
    } else {
      // User is not a student, redirect or send an unauthorized response
      res.status(403).send('Unauthorized - Student access required');
    }
  };
