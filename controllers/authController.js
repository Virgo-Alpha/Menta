const express = require('express');
const router = express.Router();
const passport = require('../config/passport');
const userDao = require('../models/userModel.js'); 

const authController = {
    // render login
  renderLogin: (req, res) => {
    res.render('login');
  },

  
  handle_login: function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {
      if (err) {
        return next(err);
      }
      if (!user) {
        // Handle authentication failure
        return res.render('login', { error: 'Invalid username or password' });
      }
      req.logIn(user, function (err) {
        if (err) {
          return next(err);
        }
        // Retrieve user information from the database based on the user ID
        userDao.lookup(user.username, function (err, foundUser) {
          if (err || !foundUser) {
            // Handle database error or user not found
            return res.render('login', { error: 'Error fetching user data' });
          }
          // Determine the appropriate dashboard based on the user's role
          let dashboard = '';
          if (foundUser.role === 'admin') {
            dashboard = 'admin_views/admin_dashboard'; // Admin dashboard view
          } else if (foundUser.role === 'student') {
            dashboard = 'student_views/student_dashboard'; // Student dashboard view
          }
          // Render the appropriate dashboard view
          res.render(dashboard, { username: foundUser.username });
        });
      });
    })(req, res, next);
  },


  // handle logout
  handle_logout: (req, res) => {
    res
        .clearCookie("jwt")
        .status(200)
        .redirect("/");
  },
}

module.exports = authController;