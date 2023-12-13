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
      return res.status(401).send();
    }
    //compare provided password with stored password
    bcrypt.compare(password, user.password, function (err, result) {
      if (result) {
        //if user exists we will write code to create the JWT here
        let payload = { username: user.username };
        let accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);
        res.cookie("jwt", accessToken);

        //and then pass onto the next middleware
        next();
      } else {
        res.status(403).send();
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
    next();
  } catch (e) {
    //if an error occurred return request unauthorized error
    res.status(401).send();
  }
};
