const express = require('express');
const router = express.Router();
const passport = require('../config/passport');

router.post('/login', passport.authenticate('local', {
  successRedirect: '/dashboard',
  failureRedirect: '/login',
  failureFlash: true
}));

router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/login');
});

module.exports = router;