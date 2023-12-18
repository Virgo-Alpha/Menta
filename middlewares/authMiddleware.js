const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");

exports.ensureAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    res.render('login', {error: 'You must be logged in to access this page'});
  }
  
exports.ensureAdmin = function (req, res, next) {
    if (req.isAuthenticated() && req.user.role === 'admin') {
      return next();
    }
    res.status(403).send('Unauthorized - Admin access required');
  }
  
exports.ensureStudent = function (req, res, next) {
    if (req.isAuthenticated() && req.user.role === 'student') {
      return next();
    }
    res.status(403).send('Unauthorized - Student access required');
    console.log("Student access required " + req.user.role);
  }

  