const express = require('express');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const passport = require('./config/passport');
const session = require('express-session');

const mainRoutes = require('./routes/mainRoutes'); // Import the mainRoutes

const app = express();
const PORT = process.env.PORT || 3000;

require('dotenv').config();
const cookieParser = require('cookie-parser');
app.use(cookieParser());

// Set up session middleware
app.use(session({ 
  secret: 'my_actual_secret', 
  resave: false, 
  saveUninitialized: false,
  cookie: { expires: 60000 * 5 }, // 5 minutes
}));

// If timed out, render home page
app.use(function(req, res, next) {
  const currentTime = Date.now();

  if (currentTime === req.session.cookie.expires) {
    console.log('Session timed out');
    res.render('login', {error: 'Session timed out. Please log in...'});
  } else {
    next();
  }
});

app.use(passport.initialize());
app.use(passport.session());

// Set up Mustache as the view engine
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Mount the mainRoutes
app.use('/', mainRoutes); // Mount the mainRoutes

// Serving static files from the 'public' directory
app.use(express.static('public'));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
